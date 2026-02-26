import type { Type, SourceFile } from 'ts-morph';

class TypeExpander {
  private readonly projectTypes: SourceFile;

  constructor(projectTypes: SourceFile) {
    this.projectTypes = projectTypes;
  }

  public expand(type: Type, depth = 0): string {
    const primitive = TypeExpander.getPrimitiveType(type);
    if (primitive) {
      return primitive;
    }

    if (type.isUnion()) {
      return this.expandUnionType(type, depth);
    }

    if (type.isTuple()) {
      return this.expandTupleType(type, depth);
    }

    if (type.isArray()) {
      return this.expandArrayType(type, depth);
    }

    const objectType = this.expandObjectType(type, depth);
    if (objectType) {
      return objectType;
    }

    return type.getText(this.projectTypes);
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

  private expandUnionType(type: Type, depth: number): string {
    const innerIndent = TypeExpander.getIndent(depth + 1);
    const nonUndefinedUnionTypes = type.getUnionTypes().filter((unionType) => !unionType.isUndefined());
    let unionTypes = nonUndefinedUnionTypes.map((unionType) => this.expand(unionType, depth));

    if (unionTypes.includes('true') && unionTypes.includes('false')) {
      unionTypes = ['boolean', ...unionTypes.filter((item) => item !== 'true' && item !== 'false')];
    }

    const inlineUnion = unionTypes.sort((a, b) => a.length - b.length || a.localeCompare(b)).join(' | ');
    const areAllString = nonUndefinedUnionTypes.every((item) => item.isString() || item.isStringLiteral());

    if (areAllString && inlineUnion.length > 85) {
      return `\n${unionTypes.map((union) => `${innerIndent}| ${union}`).join('\n')}`;
    } else {
      return inlineUnion;
    }
  }

  private expandTupleType(type: Type, depth: number): string {
    const tupleTypes = type.getTupleElements().map((item) => this.expand(item, depth + 1));
    return `[${tupleTypes.join(', ')}]`;
  }

  private expandArrayType(type: Type, depth: number): string {
    const indent = TypeExpander.getIndent(depth);
    const elementType = type.getArrayElementTypeOrThrow();
    const expandedType = this.expand(elementType, depth);

    if (expandedType.startsWith('\n')) {
      return `(${expandedType}\n${indent})[]`;
    } else if (expandedType.includes(' | ')) {
      return `(${expandedType})[]`;
    } else {
      return `${expandedType}[]`;
    }
  }

  private expandObjectType(type: Type, depth: number): string | undefined {
    const indent = TypeExpander.getIndent(depth);
    const innerIndent = TypeExpander.getIndent(depth + 1);
    const properties = type.getProperties();
    const stringIndexType = type.getStringIndexType();

    if (stringIndexType && properties.length === 0) {
      const expandedIndexType = this.expand(stringIndexType, depth);
      return `Record<string, ${expandedIndexType}>`;
    }

    if (properties.length > 0) {
      const props = properties.map((prop) => {
        const propName = prop.getName();

        if (propName === 'overrides') {
          return `${innerIndent}${propName}?: Overrides,`;
        } else if (propName === 'rules') {
          return `${innerIndent}${propName}?: Linter.RulesRecord,`;
        } else if (propName === 'attributesOrder') {
          return `${innerIndent}${propName}?: (VueAttributeCategory | VueAttributeCategory[])[],`;
        }

        const isOptional = prop.isOptional();
        const propType = prop.getTypeAtLocation(this.projectTypes);
        const expandedPropType = this.expand(propType, depth + 1);

        let propString = `${innerIndent}${propName}${isOptional ? '?' : ''}: ${expandedPropType},`;

        if (propName === 'global') {
          propString = `\n${propString}\n`;
        }

        return propString;
      });

      return `{\n${props.join('\n')}\n${indent}}`;
    }

    return undefined;
  }
}

function expandType(projectTypes: SourceFile, type: Type, depth = 0): string {
  const typeExpander = new TypeExpander(projectTypes);
  return typeExpander.expand(type, depth);
}

export { expandType };
