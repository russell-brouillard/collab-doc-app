import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type DocumentDocument = Document & CollabDocument;

@Schema({ timestamps: true })
export class CollabDocument {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  collaborators: User[];

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  owner: User;
}

export const DocumentSchema = SchemaFactory.createForClass(CollabDocument);
