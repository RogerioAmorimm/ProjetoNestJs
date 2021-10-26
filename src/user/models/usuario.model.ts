import { Document } from 'mongoose';
export class Usuario extends Document {
  id: string;
  nome: string;
  email: string;
  password: string;
}
