import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Avatar {
  @Prop({ type: String, required: true }) // Assuming image is a string (URL)
  image: string;

  @Prop({ type: String, required: true }) // Assuming userId is a string
  userId: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
