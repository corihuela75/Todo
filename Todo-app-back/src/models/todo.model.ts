// src/models/todo.model.ts
import { Schema, model } from 'mongoose';

const TodoSchema = new Schema({
  uid: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  priority: { 
    type: String, 
    enum: ['LOW', 'MEDIUM', 'HIGH'], 
    default: 'LOW' 
  },
  creationDate: { type: Date, default: Date.now },
  expiration: { type: Date },
  state: {
    type: String,
    enum: ['PENDING', 'DONE'],
    default: 'PENDING'
  },
  tags: [{ type: String }]
});

export default model('Todo', TodoSchema);
