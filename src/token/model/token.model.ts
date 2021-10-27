import { Document } from 'mongoose';

export class Token extends Document {
  id: string;
  hash: string;
  email: string;
}
