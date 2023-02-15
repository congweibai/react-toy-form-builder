import { getCurrentType } from './formHelper';
import { templates as deafultTemplates } from '../components/my-form/formTemplates';
test('getCurrentType no id', () => {
  expect(getCurrentType('', deafultTemplates)).toBe('shortText');
});

test('getCurrentType De23x longText', () => {
  expect(getCurrentType('De23x', deafultTemplates)).toBe('longText');
});
