import type { Type, SourceFile } from 'ts-morph';

class TypeExpander {
  private static readonly baselineCssTypeOverrides = {
    allowedAtRules: 'AllowedAtRules',
    allowedFunctions: 'AllowedFunctions',
    allowedMediaConditions: 'AllowedMediaConditions',
    allowedProperties: 'AllowedProperties',
    allowedPropertyValues: 'AllowedPropertyValues',
    allowedSelectors: 'AllowedSelectors',
    allowedUnits: 'AllowedUnits',
  } as const;

  private static isBaselineCssPath(path: string[]): boolean {
    return path.at(-3) === 'configs' && path.at(-2) === 'useBaseline' && path.at(-1) === 'css';
  }

  private static getBaselineCssTypeOverride(path: string[], propName: string): string | undefined {
    if (!this.isBaselineCssPath(path)) {
      return undefined;
    }

    /* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
    return this.baselineCssTypeOverrides[propName as keyof typeof this.baselineCssTypeOverrides];
  }

  private static getIndent(depth: number): string {
    return '  '.repeat(depth);
  }

  private static getPrimitiveType(type: Type): string | undefined {
    /* eslint-disable @stylistic/max-statements-per-line, @stylistic/padding-line-between-statements */
    if (type.isUnknown()) { return 'unknown'; }
    if (type.isNull()) { return 'null'; }
    if (type.isUndefined()) { return 'undefined'; }
    if (type.isString()) { return 'string'; }
    if (type.isNumber()) { return 'number'; }
    if (type.isBoolean()) { return 'boolean'; }
    if (type.isStringLiteral() || type.isNumberLiteral() || type.isBooleanLiteral()) {
      return type.getText();
    }
    /* eslint-enable @stylistic/max-statements-per-line, @stylistic/padding-line-between-statements */

    return undefined;
  }

  private readonly projectTypes: SourceFile;

  public constructor(projectTypes: SourceFile) {
    this.projectTypes = projectTypes;
  }

  public expand(type: Type, depth = 0, path: string[] = []): string {
    const primitive = TypeExpander.getPrimitiveType(type);
    if (primitive) {
      return primitive;
    }

    if (type.isUnion()) {
      return this.expandUnionType(type, depth, path);
    }

    if (type.isTuple()) {
      return this.expandTupleType(type, depth, path);
    }

    if (type.isArray()) {
      return this.expandArrayType(type, depth, path);
    }

    const objectType = this.expandObjectType(type, depth, path);
    if (objectType) {
      return objectType;
    }

    return type.getText(this.projectTypes);
  }

  private expandUnionType(type: Type, depth: number, path: string[]): string {
    const innerIndent = TypeExpander.getIndent(depth + 1);
    const nonUndefinedUnionTypes = type.getUnionTypes().filter((unionType) => !unionType.isUndefined());
    let unionTypes = nonUndefinedUnionTypes.map((unionType) => this.expand(unionType, depth, path));

    if (unionTypes.includes('true') && unionTypes.includes('false')) {
      unionTypes = ['boolean', ...unionTypes.filter((item) => item !== 'true' && item !== 'false')];
    }

    const currentPath = path.join('.');

    if (currentPath === 'env') {
      /* eslint-disable-next-line func-style */
      const cleanForSort = (string: string) => string.replaceAll(/^['"]|['"]$/g, '');
      unionTypes.sort((a, b) => cleanForSort(a).localeCompare(cleanForSort(b)));
    } else {
      unionTypes.sort((a, b) => a.length - b.length || a.localeCompare(b));
    }

    const inlineUnion = unionTypes.join(' | ');
    const areAllString = nonUndefinedUnionTypes.every((item) => item.isString() || item.isStringLiteral());

    if (areAllString && inlineUnion.length > 85) {
      return `\n${unionTypes.map((union) => `${innerIndent}| ${union}`).join('\n')}`;
    } else {
      return inlineUnion;
    }
  }

  private expandTupleType(type: Type, depth: number, path: string[]): string {
    const tupleTypes = type.getTupleElements().map((item) => this.expand(item, depth + 1, path));
    return `[${tupleTypes.join(', ')}]`;
  }

  private expandArrayType(type: Type, depth: number, path: string[]): string {
    const indent = TypeExpander.getIndent(depth);
    const elementType = type.getArrayElementTypeOrThrow();
    const expandedType = this.expand(elementType, depth, path);

    if (expandedType.startsWith('\n')) {
      return `(${expandedType}\n${indent})[]`;
    } else if (expandedType.includes(' | ')) {
      return `(${expandedType})[]`;
    } else {
      return `${expandedType}[]`;
    }
  }

  private expandObjectType(type: Type, depth: number, path: string[]): string | undefined {
    const indent = TypeExpander.getIndent(depth);
    const innerIndent = TypeExpander.getIndent(depth + 1);
    const properties = type.getProperties();
    const stringIndexType = type.getStringIndexType();

    if (stringIndexType && properties.length === 0) {
      const expandedIndexType = this.expand(stringIndexType, depth, path);
      return `Record<string, ${expandedIndexType}>`;
    }

    if (properties.length > 0) {
      const sortedProperties = [...properties].sort((a, b) => {
        const nameA = a.getName();
        const nameB = b.getName();
        const currentPath = path.join('.');

        if (path.length === 0) {
          const topLevelOrder = ['autoDetectDeps', 'env', 'gitignore', 'packageDir', 'tsConfig', 'project', 'configs'];
          const indexA = topLevelOrder.indexOf(nameA);
          const indexB = topLevelOrder.indexOf(nameB);

          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          } else if (indexA !== -1) {
            return -1;
          } else if (indexB !== -1) { // eslint-disable-line no-negated-condition
            return 1;
          } else {
            return nameA.localeCompare(nameB);
          }
        }

        if (currentPath === 'configs.test') {
          const testOrder = ['maxNestedDescribe', 'testFunction', 'cypress', 'playwright', 'storybook', 'vitest'];
          const indexA = testOrder.indexOf(nameA);
          const indexB = testOrder.indexOf(nameB);

          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          } else if (indexA !== -1) {
            return -1;
          } else if (indexB !== -1) { // eslint-disable-line no-negated-condition
            return 1;
          } else {
            return nameA.localeCompare(nameB);
          }
        }

        if (path[0] === 'project') {
          if (currentPath === 'project.globals') {
            if (nameA === 'custom') {
              return 1;
            } else if (nameB === 'custom') {
              return -1;
            }
          }

          return nameA.localeCompare(nameB);
        }

        if (path[0] === 'configs') {
          if (nameA === 'overrides') {
            return 1;
          } else if (nameB === 'overrides') {
            return -1;
          } else {
            return nameA.localeCompare(nameB);
          }
        }

        return nameA.localeCompare(nameB);
      });

      const props = sortedProperties.map((prop) => {
        const propName = prop.getName();

        const baselineCssTypeOverride = TypeExpander.getBaselineCssTypeOverride(path, propName);

        if (baselineCssTypeOverride) {
          return `${innerIndent}${propName}${prop.isOptional() ? '?' : ''}: ${baselineCssTypeOverride},`;
        }

        if (propName === 'overrides') {
          return `${innerIndent}${propName}?: Overrides,`;
        } else if (propName === 'rules') {
          return `${innerIndent}${propName}?: Linter.RulesRecord,`;
        } else if (propName === 'attributesOrder') {
          return `${innerIndent}${propName}?: (VueAttributeCategory | VueAttributeCategory[])[],`;
        } else if (propName === 'zod') {
          const innerInnerIndent = TypeExpander.getIndent(depth + 2);
          return `${innerIndent}${propName}?: boolean | {\n${innerInnerIndent}mini?: boolean,\n${innerInnerIndent}overrides?: Overrides,\n${innerIndent}},`;
        }

        const isOptional = prop.isOptional();
        const propType = prop.getTypeAtLocation(this.projectTypes);
        const expandedPropType = this.expand(propType, depth + 1, [...path, propName]);

        let propString = `${innerIndent}${propName}${isOptional ? '?' : ''}: ${expandedPropType},`;

        if (propName === 'project') {
          propString = `\n${propString}\n`;
        }

        return propString;
      });

      return `{\n${props.join('\n')}\n${indent}}`;
    }

    return undefined;
  }
}

/* eslint-disable-next-line max-params */
function expandType(projectTypes: SourceFile, type: Type, depth = 0, path: string[] = []): string {
  const typeExpander = new TypeExpander(projectTypes);
  return typeExpander.expand(type, depth, path);
}

export { expandType };
