define(['jquery'], function(){
 var BoardHandler = Class.extend({
   init: function(){
     this.client = null;
     this.curNum = 0;
     this.curViewHtml = null;
     this.adsenseBackup = $('#board').html();
     $('#board').empty();
   },
   setClient: function(client){
     this.client = client;
   },
   hide: function(){
     $('#board').css('display', 'none');
   },
   show: function(){
     $('#board').css('display', 'block');
     this.client.sendBoard('list', 0, 0);
   },
   view: function(data, level){
     this.curReplyNum = 1;

     var title = data[2];
     var content = data[3];
     var writer = data[4];
     var counter = data[5];
     var up = data[6];
     var down = data[7];
     var time = new Date(data[8]*1);
     var timeString = "" + time.getFullYear() + "." + time.getMonth() + "." + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
     var viewHtml = '<table><tr><th>' + title + '</th></tr>'
                  + '<tr><td>author: ' + writer
                  + ' views: ' + counter
                  + ' like/dislike: ' + up + '/' + down
                  + ' time: ' + timeString + '</td></tr>'
                  + '<tr><td>' + content + '</td></tr>';

     this.curViewHtml = viewHtml;

     if(level >= 130){
       viewHtml += '<tr><td><input id="ishtml" type="checkbox">HTML사용<br />';
       viewHtml += '<textarea id="reply" placeholder="Write Comment" maxlength=20 rows=1 cols=60></textarea><div id="write">Write Comment</div><p></p><p></p></td></tr>';
     }

     viewHtml += '</table>';

     if(level >= 130){
       viewHtml += '<div id="up">like</div><div id="down">dislike</div>';
     }
     viewHtml += '<div id="viewreply">More Comments</div>';
     viewHtml += '<p></p><p></p>';

     $('#board').empty();
     $('#board').html(this.adsenseBackup);
     $('#adsense').before(viewHtml);

     var self = this;
     $('#up').click(function(event){
       self.client.sendBoard('up', self.curNum, 0);
     });
     $('#down').click(function(event){
       self.client.sendBoard('down', self.curNum, 0);
     });
     $('#write').click(function(event){
       var reply = $('#reply').attr('value');
       var lowerCase = reply.toLowerCase();

       if(!($('#ishtml').attr('checked'))){
         reply = self.textToHtml(reply);
       }

       if(lowerCase.indexOf("script") >= 0 ||
          lowerCase.indexOf("frame") >= 0){
         alert("script and frame is block words");
       } else{
         if(title.length > 0 && content.length > 0){
           self.client.sendBoardWrite("reply", reply, "" + self.curNum);
         } else{
           alert("Not Content");
         }
       }
     });
     $('#ishtml').click(function(event){
       var isChecked = $('#ishtml').attr('checked');
       var replyAsText = null;
       var replyAsHtml = null;
       if(isChecked){
         replyAsText = $('#reply').attr('value');
         replyAsHtml = self.textToHtml(replyAsText);
         $('#reply').attr('value', replyAsHtml);
       } else{
         replyAsHtml = $('#reply').attr('value');
         replyAsText = self.htmlToText(replyAsHtml);
         $('#reply').attr('value', replyAsText);
       }
     });
     $('#viewreply').click(function(event){
       self.client.sendBoard('reply', self.curNum, self.curReplyNum);
     });
   },
   viewReply: function(data, level){
     var i = 2;
     var viewHtml = this.curViewHtml;
     for(i=2; i<data.length; i += 2){
       if(data[i]){
         viewHtml += '<tr><td>Author: ' + data[i] + '<br />';
         viewHtml += data[i+1] + '</td></tr>';
         this.curReplyNum++;
       } else{
         break;
       }
     }

     this.curViewHtml = viewHtml;

     if(level >= 130){
       viewHtml += '<tr><td><input id="ishtml" type="checkbox">HTML<br />';
       viewHtml += '<textarea id="reply" placeholder="Comments" maxlength=20 rows=1 cols=60></textarea><div id="write">Write Comment</div><p></p></td></tr>';
     }

     viewHtml += '</table>';
     viewHtml += '<div id="viewreply">More Comments</div>';
     viewHtml += '<p></p><p></p>';

     $('#board').empty();
     $('#board').html(this.adsenseBackup);
     $('#adsense').before(viewHtml);

     var self = this;
     $('#write').click(function(event){
       var reply = $('#reply').attr('value');
       var lowerCase = reply.toLowerCase();

       if(!($('#ishtml').attr('checked'))){
         reply = self.textToHtml(reply);
       }

       if(lowerCase.indexOf("script") >= 0 ||
          lowerCase.indexOf("frame") >= 0){
         alert("script and frame is block workd");
       } else{
         if(reply.length > 0){
           self.client.sendBoardWrite("reply", reply, "" + self.curNum);
         } else{
           alert("Not Contents");
         }
       }
     });
     $('#ishtml').click(function(event){
       var isChecked = $('#ishtml').attr('checked');
       var replyAsText = null;
       var replyAsHtml = null;
       if(isChecked){
         replyAsText = $('#reply').attr('value');
         replyAsHtml = self.textToHtml(replyAsText);
         $('#reply').attr('value', replyAsHtml);
       } else{
         replyAsHtml = $('#reply').attr('value');
         replyAsText = self.htmlToText(replyAsHtml);
         $('#reply').attr('value', replyAsText);
       }
     });
     $('#viewreply').click(function(event){
       self.client.sendBoard('reply', self.curNum, self.curReplyNum);
     });
   },
   list: function(data, level){
     var i=0;

     var lastnum = parseInt(data[2]);
     this.curNum = lastnum;
     var title = [data[3], data[4], data[5], data[6], data[7],
                  data[8], data[9], data[10], data[11], data[12]];
     var writer = [data[13], data[14], data[15], data[16], data[17],
                   data[18], data[19], data[20], data[21], data[22]];
     var counter = [data[23], data[24], data[25], data[26], data[27],
                    data[28], data[29], data[30], data[31], data[32]];
     var up = [data[33], data[34], data[35], data[36], data[37],
               data[38], data[39], data[40], data[41], data[42]];
     var down = [data[43], data[44], data[45], data[46], data[47],
                 data[48], data[49], data[50], data[51], data[52]];

     for(i = 0; i<counter.length; i++){
       if(!counter[i]){
         counter[i] = 0;
       }
     }

     var viewHtml = '<table><tr><th>No</th><th>Title</th><th>Author</th><th>Views</th><th>like/dislike</th></tr>';
     var i = 0;

     for(i=0; i<title.length && lastnum - i > 0; i++){
       viewHtml += '<tr id="boardlist' + (i+1) + '">';
       viewHtml += '<td>' + (lastnum - i) + '</td>';
       viewHtml += '<td>' + title[i] + '</td>';
       viewHtml += '<td>' + writer[i] + '</td>';
       viewHtml += '<td>' + counter[i] + '</td>';
       viewHtml += '<td>' + up[i] + '/' + down[i] + '</td>';
       viewHtml += '</tr>';
     }

     viewHtml += '</table>';

     if(lastnum > 10){
       viewHtml += '<div id="nextpage">Next</div>';
     }

     if(level >= 130){
       viewHtml += '<div id="write">Write</div>';
     }

     viewHtml += '<p>※ 게시판 기능은 아직 만드는 중입니다.</p>';

     $('#board').empty();
     $('#board').html(this.adsenseBackup);
     $('#adsense').before(viewHtml);

     var self = this;
     $('#boardlist1').click(function(event){
       self.client.sendBoard('view', lastnum, 0);
       self.curNum = lastnum;
     });
     $('#boardlist2').click(function(event){
       self.client.sendBoard('view', lastnum - 1, 0);
       self.curNum = lastnum - 1;
     });
     $('#boardlist3').click(function(event){
       self.client.sendBoard('view', lastnum - 2, 0);
       self.curNum = lastnum - 2;
     });
     $('#boardlist4').click(function(event){
       self.client.sendBoard('view', lastnum - 3, 0);
       self.curNum = lastnum - 3;
     });
     $('#boardlist5').click(function(event){
       self.client.sendBoard('view', lastnum - 4, 0);
       self.curNum = lastnum - 4;
     });
     $('#boardlist6').click(function(event){
       self.client.sendBoard('view', lastnum - 5, 0);
       self.curNum = lastnum - 5;
     });
     $('#boardlist7').click(function(event){
       self.client.sendBoard('view', lastnum - 6, 0);
       self.curNum = lastnum - 6;
     });
     $('#boardlist8').click(function(event){
       self.client.sendBoard('view', lastnum - 7, 0);
       self.curNum = lastnum - 7;
     });
     $('#boardlist9').click(function(event){
       self.client.sendBoard('view', lastnum - 8, 0);
       self.curNum = lastnum - 8;
     });
     $('#boardlist10').click(function(event){
       self.client.sendBoard('view', lastnum - 9, 0);
       self.curNum = lastnum - 9;
     });
     $('#write').click(function(event){
       self.write();
     });
     $('#nextpage').click(function(event){
       self.curNum = lastnum - 10;
       self.client.sendBoard('list', self.curNum, 0);
     });
   },
   write: function(){
     var viewHtml = '<table><tr><td><textarea id="title" placeholder="Title" maxlength=20 rows=1 cols=60></textarea></td></tr>';
     viewHtml += '<tr><td><input id="ishtml" type="checkbox">HTML</td></tr>';
     viewHtml += '<tr><td><textarea id="content" placeholder="Contents" maxlength=1000 rows=20 cols=120></textarea></td></tr></table>';
     viewHtml += '<div id="write">Write</div>';
     viewHtml += '<p></p><p></p>';

     $('#board').empty();
     $('#board').html(this.adsenseBackup);
     $('#adsense').before(viewHtml);

     var self = this;
     $('#write').click(function(event){
       var title = $('#title').attr('value');
       var content = $('#content').attr('value');
       var lowerCase = content.toLowerCase();

       if(!($('#ishtml').attr('checked'))){
         content = self.textToHtml(content);
       }

       if(lowerCase.indexOf("script") >= 0 ||
          lowerCase.indexOf("frame") >= 0){
         alert("script와 frame은 금지어입니다");
       } else{
         if(title.length > 0 && content.length > 0){
           self.client.sendBoardWrite("board", title, content);
         } else{
           alert("Not Title or Contents");
         }
       }
     });
     $('#ishtml').click(function(event){
       var isChecked = $('#ishtml').attr('checked');
       var contentAsText = null;
       var contentAsHtml = null;
       if(isChecked){
         contentAsText = $('#content').attr('value');
         contentAsHtml = self.textToHtml(contentAsText);
         $('#content').attr('value', contentAsHtml);
       } else{
         contentAsHtml = $('#content').attr('value');
         contentAsText = self.htmlToText(contentAsHtml);
         $('#content').attr('value', contentAsText);
       }
     });
   },
   handleBoard: function(data, level){
     var command = data[1];

     if(command === 'view'){
       this.view(data, level);
     } else if(command === 'list'){
       this.list(data, level);
     } else if(command === 'reply'){
       this.viewReply(data, level);
     }
   },
   textToHtml: function(text){
     return text.replace(/\n/g, '<br />\n');
   },
   htmlToText: function(html){
     return html.replace(/<(?:.|\n)*?>/gm, '');
   }
 });

 return BoardHandler;
});