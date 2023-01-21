import { JsonFormControl } from './scheme/formScheme';

export const templates: JsonFormControl[] = [
  {
    label: 'Name',
    id: 'Ge21x',
    validators: {
      required: true,
    },
    value: '',
    options: {},
    //old field in angular project as name
    description: '',
    type: 'shortText',
  },
  {
    label: 'Email',
    id: 'Ge13x',
    validators: {
      required: true,
      email: true,
    },
    value: '',
    options: {},
    //old field in angular project as name
    description: '',
    type: 'shortText',
  },
  {
    label: 'ClassName',
    id: 'Ge23x',
    validators: {
      required: false,
    },
    value: '',
    options: {},
    //old field in angular project as name
    description: '',
    type: 'shortText',
  },
  {
    label: 'Description',
    id: 'De23x',
    validators: {
      required: true,
    },
    value: '',
    options: {},
    //old field in angular project as name
    description: 'Put some description on Classname',
    type: 'longText',
  },
];
