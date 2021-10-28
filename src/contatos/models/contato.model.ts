import { Document } from 'mongoose';
export class Contato extends Document {
  id: string;
  foto: string;
  nome: string;
  usuario: string;
}
