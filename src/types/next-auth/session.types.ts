import { Tokens } from '../login';

export interface SessionType {
  name: string;
  email: string;
  tokens: Tokens;
}
