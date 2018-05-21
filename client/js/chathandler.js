
define(['jquery'], function() {
  var ChatHandler = Class.extend({
      init: function(game) {
          this.self = this;
          this.game = game;
          this.chatLog = $('#chatLog');
          this.max_height = 15;
      },

      /**
       * Process a sent message.
       *
       * @param string message
       * @param boolean send
       */
      processSendMessage: function(message) {
          return this.processMessage(null, message, 'senders');
      },

      /**
       * Processes a received message.
       *
       * @param string message
       */
      processReceiveMessage: function(entityId, message) {
          return this.processMessage(entityId, message, 'receivers');
      },

      /**
       * Calls a registered command pattern callback.  Returns true if a callback occurs.
       *
       * @param string message
       * @param string type
       */
      processMessage: function(entityId, message, type) {
          var pattern = message.substring(0, 3),
              self = this,
              commandPatterns = {
                  senders: {
                      // World chat
                      "/1 ": function(message) {
                          self.game.client.sendChat("/1 " + self.game.player.name + ": " + message);
                          return true;
                      }
                  },
                  receivers: {
                      // World chat
                      "/1 ": function(entityId, message) {
                          messageId = Math.floor(Math.random() * 10000);
                          self.addToChatLog(message);
                          return true;
                      }
                  }
              };
          if (pattern in commandPatterns[type]) {
              if (typeof commandPatterns[type][pattern] == "function") {
                  switch(type) {
                      case 'senders':
                          return commandPatterns[type][pattern](message.substring(3));
                      case 'receivers':
                          return commandPatterns[type][pattern](entityId, message.substring(3));
                  }
                  
              }
          }
          return false;
      },
      addToChatLog: function(message){
          var self = this;
          var el = $("<p>" + message + "</p>");
          $(el).appendTo(this.chatLog);
          $(this.chatLog).scrollTop(999999);
      },
      incChatWindow: function(){
          this.max_height += 5;
          this.chatLog.css('max-height', this.max_height + '%');
      },
      decChatWindow: function(){
          this.max_height -= 5;
          if(this.max_height < 5){
              this.max_height = 5;
          }
          this.chatLog.css('max-height', this.max_height + '%');
      }
  });

  return ChatHandler;
});