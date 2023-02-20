import { JsonFormControl } from '../components/my-form/scheme/formScheme';

export function getCurrentType(
  selectedId: string,
  templates: JsonFormControl[]
) {
  return (
    templates.find((template) => template.id === selectedId)?.type ||
    'shortText'
  );
}

export function getCurrentItem(
  selectedId: string,
  templates: JsonFormControl[]
) {
  return templates.find((template) => template.id === selectedId) || null;
}
