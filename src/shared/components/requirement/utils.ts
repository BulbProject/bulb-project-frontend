import { DataType } from 'ts4ocds/extensions/requirements';

export const isBoolean = (dataType?: DataType): dataType is 'boolean' => dataType === 'boolean';

export const isNumeric = (dataType?: DataType): dataType is 'number' | 'integer' => {
  return dataType === 'integer' || dataType === 'number';
};
