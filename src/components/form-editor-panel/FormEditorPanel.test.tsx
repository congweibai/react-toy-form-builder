import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JsonFormControl } from '../my-form/scheme/formScheme';
import { FormEditorPanel } from './FormEditorPanel';

let onChangeTemplateType: () => void;
let onChangeTemplateRequired: () => void;
describe('FormEditorPanel', () => {
  beforeEach(() => {
    onChangeTemplateType = jest.fn();
    onChangeTemplateRequired = jest.fn();
  });
  test('renders FormBuilder', async () => {
    const testItem: JsonFormControl = {
      label: 'Name',
      id: 'Ge21x',
      validators: {
        required: true,
      },
      value: '',
      options: {},
      //old field in angular project as name
      description: '',
      type: 'shortText',
    };
    render(
      <FormEditorPanel
        selectedId="1234"
        onChangeTemplateType={onChangeTemplateType}
        onChangeTemplateRequired={onChangeTemplateRequired}
        currentItem={testItem}
      ></FormEditorPanel>
    );
    const selectedIdElement = screen.getByText(/1234/i);
    expect(selectedIdElement).toBeInTheDocument();

    const trigger = screen.getByRole('button');
    userEvent.click(trigger);
    const options = screen.getAllByRole('option');
    userEvent.click(options[1]);
    expect(onChangeTemplateType).toBeCalledTimes(1);

    const isRequiredComponent = screen.getByRole('checkbox');
    expect(isRequiredComponent).toBeChecked();
    userEvent.click(isRequiredComponent);
    expect(onChangeTemplateType).toBeCalledTimes(1);
    expect(onChangeTemplateRequired).toBeCalledWith(false);
  });
});
