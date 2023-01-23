import { render, screen } from '@testing-library/react';
import { FormBuilder } from './FormBuilder';
import { templates as deafultTemplates } from '../my-form/formTemplates';
import userEvent from '@testing-library/user-event';
test('renders FormBuilder', () => {
  render(<FormBuilder />);
  const formElement = screen.getByText(/form builder/i);
  expect(formElement).toBeInTheDocument();
});

test('render every json item', () => {
  render(<FormBuilder />);
  const expectedLength = deafultTemplates.length;
  const listParent = screen.getByTestId('builder-list');
  expect(listParent.childNodes).toHaveLength(expectedLength);
});

test('click remove button', async () => {
  render(<FormBuilder />);
  const expectedLength = deafultTemplates.length;
  const listParent = screen.getByTestId('builder-list');
  const removeButtons = screen.getAllByRole('remove');
  for (let i = 0; i < expectedLength; i++) {
    userEvent.click(removeButtons[i]);
    expect(listParent.childNodes).toHaveLength(expectedLength - i - 1);
  }
});
