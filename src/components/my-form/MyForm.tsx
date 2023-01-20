import { useMemo } from 'react';
import { useForm } from '../../hooks/useForm';

function MyForm() {
  const validators = useMemo(() => {
    return {
      name: (value: string) => {
        // name validator with length should greater than 2
        if (value.length < 2) return 'Name length should be no less than 2.';
        return null;
      },
      email: (value: string) => {
        // email should containt '@'
        if (!value.includes('@')) return 'Invalid email address';
        return null;
      },
    };
  }, []);
  const { values, errors, setFieldValue } = useForm({}, validators);
  // UI goes here
  return (
    <form>
      <div>
        <label>Name: </label>
        <input
          type="text"
          onChange={(evt) => setFieldValue('name', evt.target.value)}
          value={values.name || null}
        />
        <div>{errors.name && errors.name}</div>
      </div>
      <div>
        <label>Email: </label>
        <input
          type="text"
          onChange={(evt) => setFieldValue('email', evt.target.value)}
          value={values.email || null}
        />
        <div>{errors.email && errors.email}</div>
      </div>
    </form>
  );
}

export { MyForm };
