import { Avatar, Button, Grid, List } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useFormContext } from '../../context/form-context';
import { v4 as uuid } from 'uuid';
import { FormEditorPanel } from '../form-editor-panel/FormEditorPanel';
import { getCurrentItem } from '../../helper/formHelper';
import { JsonFormControl } from '../my-form/scheme/formScheme';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '../sortable-item/SortableItem';

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
  const onChangeCurrentItem = (newItem: JsonFormControl) => {
    const copyTemplates = [...templates];
    const indexToChange = copyTemplates.findIndex(
      (item) => item.id === selectedId
    );
    copyTemplates[indexToChange] = newItem;
    setTemplates(copyTemplates);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <div>Toy Form Builder</div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={templates}
          strategy={verticalListSortingStrategy}
        >
          <List dense data-testid="builder-list">
            {templates.map((template, index) => {
              return (
                <SortableItem
                  template={template}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  deleteItemFromTemplates={deleteItemFromTemplates}
                  key={template.id}
                ></SortableItem>
              );
            })}
          </List>
        </SortableContext>
      </DndContext>

      <Button role="add-item" onClick={() => addItemToTemplates()}>
        <Avatar>
          <AddIcon />
        </Avatar>
      </Button>

      <Grid container px={2}>
        {selectedId && (
          <FormEditorPanel
            currentItem={getCurrentItem(selectedId, templates)}
            onChangeCurrentItem={onChangeCurrentItem}
          ></FormEditorPanel>
        )}
      </Grid>
    </>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTemplates((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

export { FormBuilder };
