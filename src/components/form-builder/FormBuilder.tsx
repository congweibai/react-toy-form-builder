import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { templates as deafultTemplates } from '../my-form/formTemplates';
import DeleteIcon from '@mui/icons-material/Delete';
import { JsonFormControl } from '../my-form/scheme/formScheme';
function FormBuilder() {
  const [selectedId, setSelectedId] = useState<string>();
  const [templates, setTemplates] =
    useState<JsonFormControl[]>(deafultTemplates);

  const deleteItemFromTemplates = (id: string) => {
    const copyTemplates = [...templates];
    const indexToRemove = copyTemplates.findIndex((item) => item.id === id);
    if (indexToRemove !== -1) {
      copyTemplates.splice(indexToRemove, 1);
      setTemplates(copyTemplates);
    }
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
    </>
  );
}

export { FormBuilder };
