import { render, screen } from '@testing-library/react';
import { MyForm } from './MyForm';
import { templates } from './formTemplates';

test('renders myForm', () => {
  render(<MyForm />);
  const formElement = screen.getByTestId('custom-form');
  expect(formElement).toBeInTheDocument();
});

test('check all form element got render', () => {
  render(<MyForm />);
  const formTemplates = templates;
  formTemplates.forEach((template) => {
    const formElement = screen.getByTestId(new RegExp(template.id));
    expect(formElement).toBeInTheDocument();
  });
});
