import { render, screen } from '@testing-library/react';
import { MyForm } from './MyForm';
import { templates } from './formTemplates';
import { FormProvider } from '../../context/form-context';

test('renders myForm', () => {
  render(
    <FormProvider>
      <MyForm />
    </FormProvider>
  );
  const formElement = screen.getByTestId('custom-form');
  expect(formElement).toBeInTheDocument();
});

test('check all form element got render', () => {
  render(
    <FormProvider>
      <MyForm />
    </FormProvider>
  );
  const formTemplates = templates;
  formTemplates.forEach((template) => {
    const formElement = screen.getByTestId(new RegExp(template.id));
    expect(formElement).toBeInTheDocument();
  });
});
