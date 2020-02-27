import { bVariable } from '../../interfaces/bruce/bVariable';

export const stringVariable: bVariable<string> = {
  jsonSchema: {
    type: 'string',
  },
  name: 'Basic string variable',
};

export const numberVariable: bVariable<number> = {
  jsonSchema: {
    type: 'number',
  },
  name: 'Basic number variable',
};
