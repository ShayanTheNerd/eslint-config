import type { InterfaceDeclaration } from 'ts-morph';

import { styleText } from 'node:util';

function getVueAttrCategoryUnion(optionsInterface: InterfaceDeclaration): string | undefined {
  const optionsType = optionsInterface.getType();
  const configs = optionsType.getPropertyOrThrow('configs').getTypeAtLocation(optionsInterface).getNonNullableType();
  const vue = configs.getPropertyOrThrow('vue').getTypeAtLocation(optionsInterface);
  const vueOptions = vue.getUnionTypes().find((type) => type.getProperty('attributesOrder'));
  const attributesOrder = vueOptions?.getPropertyOrThrow('attributesOrder').getTypeAtLocation(optionsInterface);

  if (!attributesOrder) {
    console.warn(
      styleText('yellow', '⚠ Warning:'),
      `Could not find ${styleText('bgBlack', ' configs.vue.attributesOrder ')}.`,
      `${styleText('bgBlack', ' VueAttributeCategory ')} will be ${styleText('bgBlack', ' undefined ')}.`,
    );

    return undefined;
  }

  const attributeCategories = attributesOrder
    .getNonNullableType()
    .getArrayElementTypeOrThrow()
    .getUnionTypes()
    .filter((type) => type.isStringLiteral())
    .map((type) => {
      const value = type.getLiteralValue();
      return typeof value === 'string' ? value : '';
    })
    .sort((a, b) => a.length - b.length || a.localeCompare(b));
  const attributeCategoryUnion = attributeCategories.map((category) => `| '${category}'`).join('\n    ');

  return attributeCategoryUnion;
}

export { getVueAttrCategoryUnion };
