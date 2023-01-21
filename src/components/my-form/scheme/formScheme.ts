export const validatorCallbacks = {
  required: (
    value: any,
    options?: {
      label?: string;
    }
  ) => {
    if (!value) return `${options?.label ?? 'This field'} is required`;
    return null;
  },
  email: (
    value: string,
    options?: {
      label?: string;
    }
  ) => {
    if (!value.includes('@')) return 'Invalid email address';
    return null;
  },
};

export interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  nullValidator?: boolean;
}

export interface JsonFormControlOptions {
  min?: string;
  max?: string;
  icon?: string;
  highlightField?: boolean;
  hideFromSiteRequests?: boolean;
}

export type TemplateFormType =
  | 'shortText'
  | 'longText'
  | 'number'
  | 'imageUpload'
  | 'fileAttachment'
  | 'singleSelect'
  | 'multiSelect'
  | 'checkbox'
  | 'date'
  | 'sectionHeading';

export interface JsonFormControl {
  placeholder?: string;
  //name is description in preview
  description: string;
  label: string;
  //default value for input
  value: any;
  type: TemplateFormType;
  options: JsonFormControlOptions;
  // required: boolean;
  validators: JsonFormValidators;
  id: string;
  selectionOptions?: string[];
}
