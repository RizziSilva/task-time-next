import { Tokens } from './tokens.types';

export interface LoginResponseType {
  name: string;
  email: string;
  token: Tokens;
}
