import { Schema, model, models, Document, Types } from "mongoose";

// Define the Message schema for each message in the community
const MessageSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } 
);

const CommunitySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    messages: [MessageSchema], 
  },
  {
    timestamps: true,
  }
);

interface ICommunity extends Document {
  title: string;
  description: string;
  messages: {
    userId: Types.ObjectId;
    content: string;
    createdAt: Date;
  }[];
}

const Community = models?.Community || model<ICommunity>("Community", CommunitySchema);

export default Community;
