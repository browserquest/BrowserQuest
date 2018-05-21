
define(['jquery'], function() {
 var TextWindowHandler = Class.extend({
     init: function(){
         this.self = this;
         this.textWindowOn = true;
         this.textWindow = $('#textWindow');

         var text = '<p><h4>도움말</h4></p>'
                     + '<p><h3>전체채팅: /1 할말</h3></p>'
                     + '<p>쿵쿵따: /2 단어</p>'
                     + '<p>힐링 아이템 단축키: 숫자키 1번 2번</p>'
                     + '<p>밴: /i 닉네임 (경험치 10만 이상만 가능)</h3></p>'
                     + '<p>아래 물음표 버튼을 누르면 장비 순서 및 도움말을 볼 수 있습니다.</p>'
                     + '<footer>클릭하면 닫힙니다.</footer>';
         $('#textWindow').html(text);
         $('#textWindow').fadeIn('fast');
     },
     toggleTextWindow: function(){
         if(this.textWindowOn){
             this.textWindowOn = false;
             $('#textWindow').fadeOut('fast');
             $('#helpbutton').removeClass('active');
         } else{
             this.textWindowOn = true;
             $('#textWindow').fadeIn('fast');
             $('#helpbutton').addClass('active');
         }
     },
     setHtml: function(html){
         $('#textWindow').html(html);
     },
     close: function(){
         this.textWindowOn = false;
         $('#textWindow').fadeOut('fast');
         $('#helpbutton').removeClass('active');
     }
 });

 return TextWindowHandler;
});