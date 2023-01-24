import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFormContext } from '../../context/form-context';
import { v4 as uuid } from 'uuid';
function FormBuilder() {
  const [selectedId, setSelectedId] = useState<string>();
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
  return (
    <>
      <div>Form Builder</div>
      <List dense data-testid="builder-list">
        {templates.map((template) => {
          return (
            <ListItem
              selected={selectedId === template.id}
              key={template.id}
              onClick={() => {
                setSelectedId(template.id);
              }}
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
    </>
  );
}

export { FormBuilder };
