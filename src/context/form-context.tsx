import { createContext, useContext, useState } from 'react';
import { JsonFormControl } from '../components/my-form/scheme/formScheme';
import { templates as deafultTemplates } from '../components/my-form/formTemplates';
interface FormContextValues {
  templates: JsonFormControl[];
  setTemplates: React.Dispatch<React.SetStateAction<JsonFormControl[]>>;
}

const FormContext = createContext<FormContextValues>({} as FormContextValues);
FormContext.displayName = 'FormContext';

function FormProvider(props: any) {
  const [templates, setTemplates] =
    useState<JsonFormControl[]>(deafultTemplates);
  const value = { templates, setTemplates };
  return <FormContext.Provider value={value} {...props} />;
}

function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(`useAuth must be used within a FormProvider`);
  }
  return context;
}

export { FormProvider, useFormContext, FormContext };
