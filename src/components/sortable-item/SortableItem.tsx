import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Delete, DragHandle } from '@mui/icons-material';
import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { JsonFormControl } from '../my-form/scheme/formScheme';

export function SortableItem({
  template,
  selectedId,
  setSelectedId,
  deleteItemFromTemplates,
}: {
  template: JsonFormControl;
  selectedId: string;
  deleteItemFromTemplates: (id: string) => void;
  setSelectedId: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: template.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem
      ref={setNodeRef}
      selected={selectedId === template.id}
      style={{
        ...{
          border: selectedId === template.id ? '1px solid blue' : '',
          paddingLeft: selectedId === template.id ? '18px' : '',
        },
        ...style,
      }}
      key={template.id}
      onClick={() => {
        setSelectedId(template.id);
      }}
      role="form-item"
    >
      <IconButton {...listeners} {...attributes}>
        <DragHandle></DragHandle>
      </IconButton>
      <ListItemText primary={template.label} secondary={template.type} />
      {selectedId === template.id && (
        <ListItemAvatar>
          <Button
            role="remove"
            onClick={() => deleteItemFromTemplates(template.id)}
          >
            <Avatar>
              <Delete />
            </Avatar>
          </Button>
        </ListItemAvatar>
      )}
    </ListItem>
  );
}
