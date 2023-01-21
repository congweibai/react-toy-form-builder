import { Box, TextField } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { templates } from './formTemplates';

function MyForm() {
  // const validators = useMemo(() => {
  const { values, errors, setFieldValue } = useForm(templates);
  // UI goes here
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      data-testid="custom-form"
    >
      {values.map((item) => {
        return (
          (item.type === 'shortText' && (
            <div key={item.id}>
              <TextField
                error={errors[item.id]}
                label={item.label}
                value={item.value || ''}
                onChange={(evt) => setFieldValue(item, evt.target.value)}
                helperText={errors[item.id] && errors[item.id]}
              />
            </div>
          )) ||
          (item.type === 'longText' && (
            <div key={item.id}>
              <TextField
                error={errors[item.id]}
                label={item.label}
                value={item.value || ''}
                onChange={(evt) => setFieldValue(item, evt.target.value)}
                helperText={errors[item.id] && errors[item.id]}
                multiline
                rows={4}
              />
            </div>
          ))
        );
      })}
    </Box>
  );
}

export { MyForm };
