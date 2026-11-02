import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  section: string;

  @Prop({ trim: true })
  description?: string;

  @Prop()
  price?: number;
}

export type ItemDocument = HydratedDocument<Item>;
export const ItemSchema = SchemaFactory.createForClass(Item);
