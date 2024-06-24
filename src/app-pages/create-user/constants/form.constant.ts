export const FIELDS_KEYS = {
  NAME: {
    name: 'name',
    type: 'text',
    label: 'Nome',
  },
  EMAIL: {
    name: 'email',
    type: 'text',
    label: 'Email',
  },
  PASSWORD: {
    name: 'password',
    type: 'password',
    label: 'Senha',
  },
};

export const FIELDS = [FIELDS_KEYS.EMAIL, FIELDS_KEYS.PASSWORD, FIELDS_KEYS.NAME];

export const INITIAL_STATE = {
  [FIELDS_KEYS.NAME.name]: '',
  [FIELDS_KEYS.EMAIL.name]: '',
  [FIELDS_KEYS.PASSWORD.name]: '',
  errorMessage: '',
  fieldErrors: [],
};
