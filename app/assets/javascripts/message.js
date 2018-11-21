$(document).on('turbolinks:load', function() {
  $(function(){
    function buildHTML(message){
      var html = `
                  <div class="chat-main__message">
                    <div class="chat-main__message-name">${message.user_name}</div>
                    <div class="chat-main__message-time">${message.created_at}</div>
                    <p class="chat-main__message-body">${message.content}</p>
                    <img class="lower-message__image" src=${message.image} onerror="this.style.display='none'" width="128">
                  </div>
                  `
      return html;
    }
    $('#new_message').on("submit", function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var href = window.location.href;
      var button = $(this).find('.submit');
      $.ajax({
        url: href,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        complete: function(e) {
          button.attr('disabled', false);
        },
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat-main__body--messages-list').append(html)
        $('.message').val('')
        $('#message_image').val('')
        $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast')
      })
      .fail(function(){
        alert('error');
      })
    })

    function buildMESSAGE(message){
      var html = `
                  <div class="chat-main__message" data-message-id="${message.id}">
                    <div class="chat-main__message-name">${message.user_name}</div>
                    <div class="chat-main__message-time">${message.created_at}</div>
                    <p class="chat-main__message-body">${message.content}</p>
                    <img class="lower-message__image" src=${message.image} onerror="this.style.display='none'" width="128">
                  </div>
                  `
      return html;
    }

    $(function(){
      setInterval(update, 5000);
      //10000ミリ秒ごとにupdateという関数を実行する
    });
    function update(){ //この関数では以下のことを行う
      if($('.chat-main__message')[0]){ //もし'messages'というクラスがあったら
        var message_id = $('.chat-main__message:last').data('message-id'); //一番最後にある'messages'というクラスの'id'というデータ属性を取得し、'message_id'という変数に代入
      } else { //ない場合は
        var message_id = 0 //0を代入
      }
      $.ajax({ //ajax通信で以下のことを行う
        url: window.location.href, //urlは現在のページを指定
        type: 'GET', //メソッドを指定
        data: { message: { id: message_id } //このような形(paramsの形をしています)で、'id'には'message_id'を入れる
        },
        dataType: 'json' //データはjson形式
      })
      .done(function(data){ //通信したら、成功しようがしまいが受け取ったデータ（@new_message)を引数にとって以下のことを行う
        var id = $('.chat-main__message').data('message-id');
        var insertHTML = '';
        $.each(data, function(i, data){ //'data'を'data'に代入してeachで回す
          if (message_id > id ) {
            insertHTML += buildMESSAGE(data); //buildMESSAGEを呼び出す
          }
        });
        $('.chat-main__body--messages-list').append(insertHTML)
        $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast')
      });
    }
  });
});
