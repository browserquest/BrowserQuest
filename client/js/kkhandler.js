
define(function() {
 var KkHandler = Class.extend({
   init: function(){
     this.kungLog = $('#kungLog');
   },
   add: function(message, player){
     var self = this;
     var el = $("<p>" + message + "</p>");
     $(el).appendTo(this.kungLog);
     $(this.kungLog).scrollTop(999999);

     var sp = message.split(' ');
     if(sp[0] === player.name && sp[1] === ':'){
       var count = parseInt(sp[2]);
       player.putInventory(Types.Entities.BURGER, count);
     }
   },
 });

 return KkHandler;
});