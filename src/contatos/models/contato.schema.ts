import * as mongoose from 'mongoose';

export const contatoSchema = new mongoose.Schema({
  id: String,
  nome: String,
  foto: String,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Contato' },
});
