export const FIELD_KEYS = {
  TITLE: 'title',
  DESCRIPTION: 'description',
  LINK: 'link',
};

export const TITLE_FIELD = {
  name: FIELD_KEYS.TITLE,
  placeholder: 'No que você está trabalhando?',
};

export const ADDITIONAL_FIELDS = [
  {
    name: FIELD_KEYS.DESCRIPTION,
    placeholder: 'Descrição',
    hasBorder: true,
  },
  {
    name: FIELD_KEYS.LINK,
    placeholder: 'Link para Tarefa',
    hasBorder: false,
  },
];

export const INITIAL_STATE = {
  [FIELD_KEYS.DESCRIPTION]: '',
  [FIELD_KEYS.LINK]: '',
  [FIELD_KEYS.TITLE]: '',
};
