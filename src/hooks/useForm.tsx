import { useCallback, useState } from 'react';
// form hook with validator

interface FormValidators {
  [name: string]: Function;
}

interface FormValue {
  [key: string]: any;
}

interface FormError {
  [key: string]: any;
}

const useForm = (initialValues = {}, validators: FormValidators) => {
  // set whole form values
  const [values, setValues] = useState<FormValue>(initialValues);
  // set form error state
  const [errors, setErrors] = useState<FormError>({});

  const setFieldValue = useCallback(
    (name: string, value: any) => {
      setValues((values) => ({
        ...values,
        [name]: value,
      }));

      // if valitator passing, valia it
      if (validators[name]) {
        const errMsg = validators[name](value);
        setErrors((errors) => ({
          ...errors,
          // if any error, return error or clear it
          [name]: errMsg || null,
        }));
      }
    },
    [validators]
  );
  // return all states
  return { values, errors, setFieldValue };
};

export { useForm };
