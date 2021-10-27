import { Document } from 'mongoose';
export class Usuario extends Document {
  nome: string;
  email: string;
  password: string;
}
