import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFormContext } from '../../context/form-context';
import { v4 as uuid } from 'uuid';
import { FormEditorPanel } from '../form-editor-panel/FormEditorPanel';
import { getCurrentType } from '../../helper/formHelper';
import { TemplateFormType } from '../my-form/scheme/formScheme';
function FormBuilder() {
  const [selectedId, setSelectedId] = useState<string>('');
  const { templates, setTemplates } = useFormContext();

  const deleteItemFromTemplates = (id: string) => {
    const copyTemplates = [...templates];
    const indexToRemove = copyTemplates.findIndex((item) => item.id === id);
    if (indexToRemove !== -1) {
      copyTemplates.splice(indexToRemove, 1);
      setTemplates(copyTemplates);
    }
  };
  const addItemToTemplates = () => {
    const copyTemplates = [...templates];
    copyTemplates.push({
      label: 'Name',
      id: uuid(),
      validators: {
        required: true,
      },
      value: '',
      options: {},
      //old field in angular project as name
      description: '',
      type: 'shortText',
    });
    setTemplates(copyTemplates);
  };
  const onChangeTemplateType = (newType: TemplateFormType) => {
    const copyTemplates = [...templates];
    const indexToChange = copyTemplates.findIndex(
      (item) => item.id === selectedId
    );
    copyTemplates[indexToChange].type = newType;
    setTemplates(copyTemplates);
  };

  const dragItem: any = useRef();
  const dragOverItem: any = useRef();
  const dragStart = (e: any, id: string) => {
    dragItem.current = id;
  };
  const dragEnter = (e: any, id: string) => {
    dragOverItem.current = id;
  };
  const drop = (e: any) => {
    const copyListItems = [...templates];
    const dragItemIndex = copyListItems.findIndex(
      (item) => item.id === dragItem.current
    );
    const dragOverItemIndex = copyListItems.findIndex(
      (item) => item.id === dragOverItem.current
    );
    const dragItemContent = copyListItems[dragItemIndex];
    copyListItems.splice(dragItemIndex, 1);
    copyListItems.splice(dragOverItemIndex, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTemplates(copyListItems);
  };
  return (
    <>
      <div>Form Builder</div>
      <List dense data-testid="builder-list">
        {templates.map((template, index) => {
          return (
            <ListItem
              selected={selectedId === template.id}
              key={template.id}
              onClick={() => {
                setSelectedId(template.id);
              }}
              draggable
              onDragStart={(e) => dragStart(e, template.id)}
              onDragEnter={(e) => dragEnter(e, template.id)}
              onDragEnd={drop}
            >
              <ListItemText
                primary={template.label}
                secondary={template.type}
              />
              <ListItemAvatar>
                <Button
                  role="remove"
                  onClick={() => deleteItemFromTemplates(template.id)}
                >
                  <Avatar>
                    <DeleteIcon />
                  </Avatar>
                </Button>
              </ListItemAvatar>
            </ListItem>
          );
        })}
      </List>

      <Button role="add-item" onClick={() => addItemToTemplates()}>
        <Avatar>
          <AddIcon />
        </Avatar>
      </Button>

      <Grid container px={2}>
        {selectedId && (
          <FormEditorPanel
            selectedId={selectedId}
            currentType={getCurrentType(selectedId, templates)}
            onChangeTemplateType={onChangeTemplateType}
          ></FormEditorPanel>
        )}
      </Grid>
    </>
  );
}

export { FormBuilder };
