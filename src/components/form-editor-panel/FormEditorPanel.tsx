import { Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { TemplateFormType } from '../my-form/scheme/formScheme';

function FormEditorPanel({
  selectedId,
  currentType,
  onChangeTemplateType,
}: {
  selectedId: string;
  currentType: string;
  onChangeTemplateType: (newType: TemplateFormType) => void;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    onChangeTemplateType(value as TemplateFormType);
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
          Form Editor Panel goes here {selectedId} {currentType}
        </Grid>
        <Grid item>
          <Select
            data-testid="custom-select"
            value={currentType}
            label={currentType}
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
      </Grid>
    </>
  );
}

export { FormEditorPanel };
