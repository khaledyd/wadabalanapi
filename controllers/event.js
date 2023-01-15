import User from "../models/User.js";
import Event from "../models/Event.js";
import Events from "../models/Events.js";
import { createError } from "../error.js";

//create event
export const addEvent = async (req, res, next) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    next(err);
  }
};

//attend event
export const attendevents = async (req, res, next) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    next(err);
  }
};
//atted devent
export const attendevent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(403).json("wrong event id");
    } else {
      try {
        const updatedEvent = await Event.findByIdAndUpdate(
          req.params.id,
          {
            $push: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedEvent);
      } catch (err) {
        next();
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

/// GET EVENTS

export const getallevents = async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let events;
    if (username) {
      events = await Event.find({ username });
    } /*else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    }*/ else {
      events = await Event.find();
    }
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET POST
export const getevent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* 	"name":"mikel",
	"emailaddres":"mike@wqw.ccc",
	"gender":"male" */

// user atten

export const userAttend = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) res.status(404).json("event not found");
    else {
      const name = req.body.name;
      const gender = req.body.gender;
      const email = req.body.email;
      const attenees = event.attendees.length;
      const sposts = event.spots;
      if (sposts === 0) {
        res.status(401).json("sposts are filled");
      } else {

        const updatetheattendees = await Event.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              attendees: {
                name: name,
                email: email,
                gender: gender,
              },
            },
          },
          { new: true }
        );

        const updathethevent = await Event.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              "spots": sposts - 1,
            },
          },
          { new: true }
        );
      
        
        res.status(200).json(updatetheattendees);
      }
    }
  } catch (err) {
    res.status(500).json("error");
  }
};
