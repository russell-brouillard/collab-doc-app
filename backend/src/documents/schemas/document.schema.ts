// backend/src/documents/schemas/document.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocumentDocument = Document & CollabDocument;

@Schema({ timestamps: true })
export class CollabDocument {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  collaborators: string[];

  @Prop({ required: true })
  owner: string;
}

export const DocumentSchema = SchemaFactory.createForClass(CollabDocument);
