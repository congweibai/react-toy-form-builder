import { useCallback, useMemo, useState } from 'react';
import {
  JsonFormControl,
  validatorCallbacks,
} from '../components/my-form/scheme/formScheme';
// form hook with validator

interface FormError {
  [key: string]: any;
}

const useForm = (initialValues: JsonFormControl[] = []) => {
  // set whole form values
  const [values, setValues] = useState<JsonFormControl[]>(initialValues);
  // set form error state
  const [errors, setErrors] = useState<FormError>({});

  const validators = useMemo(() => {
    return validatorCallbacks;
  }, []);

  const setFieldValue = useCallback(
    (targetItem: JsonFormControl, value: any) => {
      setValues((values) => {
        const newValues = values.map((item) => {
          if (item.id === targetItem.id) {
            return {
              ...item,
              value: value,
            };
          }
          return item;
        });

        return newValues;
      });
      // if valitator passing, valia it
      if (targetItem?.validators) {
        for (const [key, validatorValue] of Object.entries(
          targetItem?.validators
        )) {
          if (validatorValue) {
            let functionKey = key as 'required' | 'email';
            const errMsg = validators[functionKey](value);
            setErrors((errors) => ({
              ...errors,
              // if any error, return error or clear it
              [targetItem.id]: errMsg || null,
            }));
          }
        }
      }
    },
    [validators]
  );
  // return all states
  return { values, errors, setFieldValue };
};

export { useForm };
