import {
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from '@mui/material';
import {
  JsonFormControl,
  TemplateFormType,
} from '../my-form/scheme/formScheme';

function FormEditorPanel({
  selectedId,
  currentItem,
  onChangeTemplateType,
  onChangeTemplateRequired,
}: {
  selectedId: string;
  currentItem: JsonFormControl | null;
  onChangeTemplateType: (newType: TemplateFormType) => void;
  onChangeTemplateRequired: (isRequired: boolean) => void;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    onChangeTemplateType(value as TemplateFormType);
  };
  const handleRequiredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked },
    } = event;
    onChangeTemplateRequired(checked);
  };
  return (
    <>
      <Grid
        container
        direction="column"
        alignContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          Form Editor Panel goes here {selectedId} {currentItem?.type || ''}
        </Grid>
        <Grid item>
          <Select
            data-testid="custom-select"
            value={currentItem?.type || ''}
            label={currentItem?.type || ''}
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
