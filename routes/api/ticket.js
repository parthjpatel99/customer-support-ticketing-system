const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateTicket = require("../../validation/ticketvalid");

// Load Ticket model
const Ticket = require("../../models/Ticket");

const {
  userAuth,
  serializedUser,
  checkRole,
  serializedTicket,
} = require("../../config/userauth");

//admin can view all tickets in the system
router.get("/viewtickets", userAuth, checkRole(["admin"]), (req, res) => {
  Ticket.find((err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      console.log("Error in data retrival : " + err);
    }
  });
});
//tickets created by individual user
router.get("/userdashboard", userAuth, checkRole(["user"]), (req, res) => {
  Ticket.find({ createdBy: req.user._id })
    .then((tickets) => {
      if (tickets) {
        res.json(tickets);
      } else {
        return res.status(402).json({ title: "No tickets" });
      }
    })
    .catch((err) => {
      return res.status(402).json({ title: "No tickets found" });
    });
});

//ticket can be created by user
router.post("/createticket", userAuth, checkRole(["user"]), (req, res) => {
  // Check validation
  const { errors, isValid } = validateTicket(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Ticket.findOne({ title: req.body.title }).then((ticket) => {
    if (ticket) {
      return res.status(400).json({ title: "Ticket already exists" });
    } else {
      const conversation = {
        message: req.body.message,
        createdBy: serializedUser(req.user._id),
        time: new Date(),
      };
      const newTicket = new Ticket({
        createdBy: serializedUser(req.user),
        title: req.body.title,
        status: "Open",
        conversation: conversation,
      });
      // Hash password before saving in database
      newTicket
        .save()
        .then((ticket) => res.json(ticket))
        .catch((err) => console.log(err));
    }
  });
});

router.put(
  "/execreplyticket",
  userAuth,
  checkRole(["executive"]),
  (req, res) => {
    const conversation = {
      message: req.body.message,
      createdBy: serializedUser(req.user._id),
      time: new Date(),
    };
    Ticket.findByIdAndUpdate(
      req.body.ticketId,
      {
        $push: { conversation: conversation },
      },
      {
        new: true,
      }
    )
      .populate("conversation.createdBy", "_id name")
      .populate("createdBy", "_id name")
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
        }
      });
  }
);
//put for update ticket
module.exports = router;
