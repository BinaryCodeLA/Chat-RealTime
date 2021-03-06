const express = require('express');
const router = express.Router();
const passport = require('passport');
const Message = require('../models/message');
const Conversation = require('../models/conversation');

//get chat-room conversation
router.get('/messages',passport.authenticate("JWT",{session: false}), (req, res,next) => {
    let response = {succes: true};
    Conversation.getChatRoom((err, chatRoom) => {
        if(err || chatRoom == null) {
            response.succes = false;
            response.msg = "There was an error on getting the conversation";
            res.json(response);
        } else {
            response.msg = "Conversation retrieved successfuly";
            response.conversation = chatRoom;
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.json(response);
        }
    });
});


// get conversation
router.get('/messages/:name1/:name2', passport.authenticate("JWT", {session: false}), (req, res, next) => {
    let response = {success: true};
    Conversation.getConversationByName(req.params.name1, req.params.name2, (err, conversation) => {
      if (err) {
        response.success = false;
        response.msg = "There was an error on getting the conversation";
        res.json(response);
      } else {
        response.msg = "Conversation retrieved successfuly";
        response.conversation = conversation;
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.json(response);
      }
    });
  });
  
  module.exports = router;