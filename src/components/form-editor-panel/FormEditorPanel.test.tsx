import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JsonFormControl } from '../my-form/scheme/formScheme';
import { FormEditorPanel } from './FormEditorPanel';

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

let onChangeCurrentItem: () => void;
describe('FormEditorPanel', () => {
  beforeEach(() => {
    onChangeCurrentItem = jest.fn();
  });
  afterEach(() => {
    cleanup();
  });
  it('renders FormBuilder', async () => {
    render(
      <FormEditorPanel
        onChangeCurrentItem={onChangeCurrentItem}
        currentItem={testItem}
      ></FormEditorPanel>
    );
    const selectedIdElement = screen.getByText(/Ge21x/i);
    expect(selectedIdElement).toBeInTheDocument();

    const trigger = screen.getByRole('button');
    userEvent.click(trigger);
    const options = screen.getAllByRole('option');
    userEvent.click(options[1]);
    expect(onChangeCurrentItem).toBeCalledTimes(1);
  });

  it('test toggle required', () => {
    render(
      <FormEditorPanel
        onChangeCurrentItem={onChangeCurrentItem}
        currentItem={testItem}
      ></FormEditorPanel>
    );
    const isRequiredComponent = screen.getByRole('checkbox');
    expect(isRequiredComponent).toBeChecked();
    userEvent.click(isRequiredComponent);
    expect(onChangeCurrentItem).toBeCalledTimes(1);
    expect(onChangeCurrentItem).toBeCalledWith({
      label: 'Name',
      id: 'Ge21x',
      validators: {
        required: false,
      },
      value: '',
      options: {},
      //old field in angular project as name
      description: '',
      type: 'shortText',
    });
  });
  it('test change label', () => {
    render(
      <FormEditorPanel
        onChangeCurrentItem={onChangeCurrentItem}
        currentItem={testItem}
      ></FormEditorPanel>
    );
    const labelElement = screen.getByLabelText(/Form Label/i);
    userEvent.type(labelElement, '1');
    expect(onChangeCurrentItem).toBeCalledTimes(1);
    expect(onChangeCurrentItem).toBeCalledWith({
      ...testItem,
      label: testItem.label + '1',
    });
  });
});
