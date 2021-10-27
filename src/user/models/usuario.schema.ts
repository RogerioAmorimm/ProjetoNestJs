import * as mongoose from 'mongoose';

export const UsuarioSchema = new mongoose.Schema({
  id: String,
  nome: String,
  email: String,
  password: String,
  token: String,
});
