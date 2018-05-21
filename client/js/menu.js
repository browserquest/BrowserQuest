define(['jquery'], function() {
 var Menu = Class.extend({
     init: function(){
         this.inventoryOn = null;
     },
     clickInventory0: function(){
         if(this.inventoryOn === "inventory0"){
             this.close();
         } else{
             this.inventoryOn = "inventory0";
         }
     },
     clickInventory1: function(){
         if(this.inventoryOn === "inventory1"){
             this.close();
         } else{
             this.inventoryOn = "inventory1";
         }
     },
     close: function(){
         this.inventoryOn = null;
     },
 });

 return Menu;
});