import mongoose, { Document, Schema } from "mongoose";
export interface IInvitation {
  Sender?: string;
  Receiver?: string;
}

export interface IInvitationDoc extends IInvitation, Document {}

const InvitationModel = new mongoose.Schema({
  Sender: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  Receiver: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

const Invitation = mongoose.model<IInvitationDoc>(
  "Invitation",
  InvitationModel
);

export default Invitation;
