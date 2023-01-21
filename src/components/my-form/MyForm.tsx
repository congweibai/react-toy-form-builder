import { Box, Button, TextField } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from '../../hooks/useForm';
import { templates } from './formTemplates';
import { getLabelValuePairs } from './helpers/getFormValues';

function MyForm() {
  // const validators = useMemo(() => {
  const { values, errors, setFieldValue } = useForm(templates);
  // UI goes here
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      console.log('values', getLabelValuePairs(values));
    },
    [values]
  );
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      data-testid="custom-form"
      onSubmit={handleSubmit}
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
          )) ||
          (item.type === 'singleSelect' && (
            <div key={item.id}>
              <TextField
                select
                error={errors[item.id]}
                label={item.label}
                value={item.value || ''}
                onChange={(evt) => setFieldValue(item, evt.target.value)}
                helperText={errors[item.id] && errors[item.id]}
                SelectProps={{
                  native: true,
                }}
              >
                {(item.selectionOptions || []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </div>
          ))
        );
      })}
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
}

export { MyForm };
