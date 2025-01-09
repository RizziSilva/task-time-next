import { AdditionalInput, Task, TitleInput } from '@types';

export const FIELD_KEYS = {
  TITLE: 'title',
  DESCRIPTION: 'description',
  LINK: 'link',
  INITIATED_AT: 'initiatedAt',
  ENDED_AT: 'endedAt',
};

export const INPUTS_LABELS = {
  [FIELD_KEYS.DESCRIPTION]: 'Descrição',
  [FIELD_KEYS.LINK]: 'Link para Tarefa',
  [FIELD_KEYS.TITLE]: 'No que você está trabalhando?',
};

export const TITLE_FIELD: TitleInput = {
  name: 'title',
  placeholder: INPUTS_LABELS[FIELD_KEYS.TITLE],
};

export const ADDITIONAL_FIELDS: Array<AdditionalInput> = [
  {
    name: 'description',
    placeholder: INPUTS_LABELS[FIELD_KEYS.DESCRIPTION],
    hasBorder: true,
  },
  {
    name: 'link',
    placeholder: INPUTS_LABELS[FIELD_KEYS.LINK],
    hasBorder: false,
  },
];

export const INITIAL_TASK_STATE: Task = {
  description: '',
  link: '',
  title: '',
  endedAt: undefined,
  initiatedAt: undefined,
};
