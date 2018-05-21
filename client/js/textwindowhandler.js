
define(['jquery'], function() {
 var TextWindowHandler = Class.extend({
     init: function(){
         this.self = this;
         this.textWindowOn = true;
         this.textWindow = $('#textWindow');

         var text = '<table fontcolor=white><tr><td>'
                  + '<p><h4>도움말</h4></p>'
                  + '<p>전체채팅: /1 할말</p>'
                  + '<p>+/- 키: 전체채팅창 최대 높이 조정</p>'
                  + '<p>아래 물음표  버튼을 누르면 장비 순서 및 도움말을 볼 수 있습니다.</p>'
                  + '</td><td>'
                  + '<p><h4>업데이트 사항</h4></p>'
                  + '<p><h5>Alpha5.9</h5></p>'
                  + '<p>- +/- 키로 전체채팅창 높이 조정</p>'
                  + '<p>- 획득경험치 공중에 뜨도록 함</p>'
                  + '<p>- clotharmor 인벤창에서 안 보이던 버그 수정</p>'
                  + '<p>- 퀘스트 추가</p>'
                  + '</td></tr></table>'
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