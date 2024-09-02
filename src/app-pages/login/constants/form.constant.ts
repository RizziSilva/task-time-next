export const FIELDS = {
  EMAIL: {
    name: 'email',
    label: 'Email',
    type: 'email',
    className: '',
  },
  PASSWORD: {
    name: 'password',
    label: 'Password',
    type: 'password',
    className: '',
  },
};

export const LOGIN_FIELDS = [FIELDS.EMAIL, FIELDS.PASSWORD];

export const INITIAL_STATE = {
  password: '',
  email: '',
  isValid: false,
};
