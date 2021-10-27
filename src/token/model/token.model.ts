import { Document } from 'mongoose';

export class Token extends Document {
  hash: string;
  email: string;
}
