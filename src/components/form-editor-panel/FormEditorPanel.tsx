import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import {
  JsonFormControl,
  TemplateFormType,
} from '../my-form/scheme/formScheme';

function FormEditorPanel({
  currentItem,
  onChangeCurrentItem,
}: {
  currentItem: JsonFormControl | null;
  onChangeCurrentItem: (newItem: JsonFormControl) => void;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    const copyCurrentItem = { ...currentItem } as JsonFormControl;
    copyCurrentItem.type = value as TemplateFormType;
    onChangeCurrentItem(copyCurrentItem);
  };
  const handleRequiredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked },
    } = event;
    const copyCurrentItem = { ...currentItem } as JsonFormControl;
    copyCurrentItem.validators.required = checked;
    onChangeCurrentItem(copyCurrentItem);
  };
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    const copyCurrentItem = { ...currentItem } as JsonFormControl;
    copyCurrentItem.label = value;
    onChangeCurrentItem(copyCurrentItem);
  };
  return (
    <>
      <Grid
        container
        direction="column"
        alignContent="flex-start"
        alignItems="flex-start"
        gap={2}
      >
        <Grid item>
          Form Editor Panel goes here {currentItem?.id || ''}{' '}
          {currentItem?.type || ''}
        </Grid>
        <Grid item width={300}>
          <TextField
            fullWidth
            variant="outlined"
            label="Form Label"
            value={currentItem?.label || ''}
            onChange={handleLabelChange}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel>Form Type</InputLabel>
            <Select
              data-testid="custom-select"
              value={currentItem?.type || ''}
              onChange={handleChange}
            >
              <MenuItem value={'shortText'}>shortText</MenuItem>
              <MenuItem value={'longText'}>longText</MenuItem>
              <MenuItem value={'singleSelect'}>singleSelect</MenuItem>
              {/* <MenuItem value={'number'}>number</MenuItem>
        <MenuItem value={'imageUpload'}>imageUpload</MenuItem>
        <MenuItem value={'fileAttachment'}>fileAttachment</MenuItem>

        <MenuItem value={'multiSelect'}>multiSelect</MenuItem>
        <MenuItem value={'checkbox'}>checkbox</MenuItem>
        <MenuItem value={'date'}>date</MenuItem>
        <MenuItem value={'sectionHeading'}>sectionHeading</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControlLabel
            value="top"
            control={
              <Switch
                checked={currentItem?.validators.required || false}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={handleRequiredChange}
              />
            }
            label="Is Required?"
            labelPlacement="top"
          />
        </Grid>
      </Grid>
    </>
  );
}

export { FormEditorPanel };
