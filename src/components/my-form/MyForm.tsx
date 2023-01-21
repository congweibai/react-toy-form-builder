import { useForm } from '../../hooks/useForm';
import { templates } from './formTemplates';

function MyForm() {
  // const validators = useMemo(() => {
  const { values, errors, setFieldValue } = useForm(templates);
  // UI goes here
  return (
    <form>
      {values.map((item) => {
        return (
          <div key={item.id}>
            <label>{item.label}: </label>
            <input
              type="text"
              onChange={(evt) => setFieldValue(item, evt.target.value)}
              value={item.value || ''}
            />
            <div>{errors[item.id] && errors[item.id]}</div>
          </div>
        );
      })}
    </form>
  );
}

export { MyForm };
