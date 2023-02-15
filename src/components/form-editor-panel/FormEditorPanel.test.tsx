import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormEditorPanel } from './FormEditorPanel';

let onChangeTemplateType: () => void;
describe('FormEditorPanel', () => {
  beforeEach(() => {
    onChangeTemplateType = jest.fn();
  });
  test('renders FormBuilder', async () => {
    render(
      <FormEditorPanel
        selectedId="1234"
        onChangeTemplateType={onChangeTemplateType}
        currentType="shortText"
      ></FormEditorPanel>
    );
    const selectedIdElement = screen.getByText(/1234/i);
    expect(selectedIdElement).toBeInTheDocument();

    const trigger = screen.getByRole('button');
    userEvent.click(trigger);
    const options = screen.getAllByRole('option');
    userEvent.click(options[1]);
    expect(onChangeTemplateType).toBeCalledTimes(1);
  });
});
