export const FIELD_KEYS = {
  TITLE: 'title',
  DESCRIPTION: 'description',
  LINK: 'link',
};

export const FIELDS = [
  {
    name: FIELD_KEYS.TITLE,
    placeholder: 'Título*',
  },
  {
    name: FIELD_KEYS.DESCRIPTION,
    placeholder: 'Descrição',
  },
  {
    name: FIELD_KEYS.LINK,
    placeholder: 'Link para Tarefa',
  },
];

export const INITIAL_STATE = {
  [FIELD_KEYS.DESCRIPTION]: '',
  [FIELD_KEYS.LINK]: '',
  [FIELD_KEYS.TITLE]: '',
};
