export const FIELDS = {
  EMAIL: {
    name: 'email',
    label: 'Email',
    type: 'email',
    className: 'mb-7 mt-8',
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
};
