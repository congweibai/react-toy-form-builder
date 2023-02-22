import { render, screen } from '@testing-library/react';
import { FormBuilder } from './FormBuilder';
import { templates as deafultTemplates } from '../my-form/formTemplates';
import userEvent from '@testing-library/user-event';
import { FormProvider } from '../../context/form-context';
test('renders FormBuilder', () => {
  render(
    <FormProvider>
      <FormBuilder />
    </FormProvider>
  );
  const formElement = screen.getByText(/form builder/i);
  expect(formElement).toBeInTheDocument();
});

test('render every json item', () => {
  render(
    <FormProvider>
      <FormBuilder />
    </FormProvider>
  );
  const expectedLength = deafultTemplates.length;
  const listParent = screen.getByTestId('builder-list');
  expect(listParent.childNodes).toHaveLength(expectedLength);
});

test('click remove button', async () => {
  render(
    <FormProvider>
      <FormBuilder />
    </FormProvider>
  );
  const expectedLength = deafultTemplates.length;
  const listParent = screen.getByTestId('builder-list');
  const formItems = screen.getAllByRole('form-item');
  for (let i = 0; i < expectedLength; i++) {
    userEvent.click(formItems[i]);
    const removeButton = screen.getByRole('remove');
    userEvent.click(removeButton);
    expect(listParent.childNodes).toHaveLength(expectedLength - i - 1);
  }
});
