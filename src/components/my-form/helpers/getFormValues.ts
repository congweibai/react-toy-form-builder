import { JsonFormControl } from '../scheme/formScheme';

export function getLabelValuePairs(values: JsonFormControl[]) {
  let results: { [key: string]: any } = {};
  values.forEach((value) => {
    const key = value.label;
    results[key] = value.value;
  });

  return JSON.stringify(results);
}
