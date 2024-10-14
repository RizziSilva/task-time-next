export const FIELD_KEYS = {
  TITLE: 'title',
  DESCRIPTION: 'description',
  LINK: 'link',
};

export const INPUTS_LABELS = {
  [FIELD_KEYS.DESCRIPTION]: 'Descrição',
  [FIELD_KEYS.LINK]: 'Link para Tarefa',
  [FIELD_KEYS.TITLE]: 'No que você está trabalhando?',
};

export const TITLE_FIELD = {
  name: FIELD_KEYS.TITLE,
  placeholder: INPUTS_LABELS[FIELD_KEYS.TITLE],
};

export const ADDITIONAL_FIELDS = [
  {
    name: FIELD_KEYS.DESCRIPTION,
    placeholder: INPUTS_LABELS[FIELD_KEYS.DESCRIPTION],
    hasBorder: true,
  },
  {
    name: FIELD_KEYS.LINK,
    placeholder: INPUTS_LABELS[FIELD_KEYS.LINK],
    hasBorder: false,
  },
];

export const INITIAL_STATE = {
  [FIELD_KEYS.DESCRIPTION]: '',
  [FIELD_KEYS.LINK]: '',
  [FIELD_KEYS.TITLE]: '',
};
