import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useCallback } from 'react';
import { useForm } from '../../hooks/useForm';
import { templates } from './formTemplates';
import { getIdValuePairs } from './helpers/getFormValues';

function MyForm() {
  // const validators = useMemo(() => {
  const { values, errors, setFieldValue } = useForm(templates);
  // UI goes here
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      console.log('values', getIdValuePairs(values));
    },
    [values]
  );
  return (
    <>
      <div>My Form</div>
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
                  data-testid={item.id}
                  error={!!errors[item.id]}
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
                  data-testid={item.id}
                  error={!!errors[item.id]}
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
                <FormControl sx={{ m: 1, minWidth: 250 }} data-testid={item.id}>
                  <InputLabel id={item.id}>{item.label}</InputLabel>
                  <Select
                    labelId={item.id}
                    error={!!errors[item.id]}
                    label={item.label}
                    value={item.value || ''}
                    onChange={(evt) => setFieldValue(item, evt.target.value)}
                  >
                    {(item.selectionOptions || []).map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors[item.id] && errors[item.id]}
                  </FormHelperText>
                </FormControl>
              </div>
            ))
          );
        })}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </>
  );
}

export { MyForm };
