const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const TicketSchema = new Schema({
  createdBy: {
    type: ObjectId,
    ref: User,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "Closed"],
    default: "Open",
    required: true,
  },
  conversation: [
    {
      message: String,
      createdBy: {
        type: ObjectId,
        ref: User,
      },
      time: Date,
    },
  ],
});

module.exports = Ticket = mongoose.model("tickets", TicketSchema);
