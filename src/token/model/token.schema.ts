import * as mongoose from 'mongoose';
export const tokenSchema = new mongoose.Schema({
  id: String,
  hash: String,
  email: String,
});
