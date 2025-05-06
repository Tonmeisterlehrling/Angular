import {Training} from './training';
import {Address} from './adress';


export type Gender = 'male' | 'female' | 'unknown';

export interface Employee {
  id: number;
  name: string;
  intern: boolean;
  gender: Gender;
  birthday: string; // ISO-Format
  trainings: Training[];
  address: Address;
}
