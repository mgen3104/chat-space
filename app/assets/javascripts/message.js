$(document).on('turbolinks:load', function() {
  $(function(){
    function buildHTML(message){
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
    $('#new_message').on("submit", function(e){
      if ($('input[type=text]').val() == '') {
        alert('error');
        return false;
      }
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
      return false;
    })

    $(function(){
      setInterval(update, 3000);
    });
    function update(){
      if($('.chat-main__message')[0]){
        var message_id = $('.chat-main__message:last').data('message-id');
      }
      else {
        var message_id = 0
      }
      $.ajax({
        url: window.location.href,
        type: 'GET',
        data: { message: { id: message_id }
        },
        dataType: 'json'
      })
      .done(function(data){
        var id = $('.chat-main__message').data('message-id');
        var insertHTML = '';
        $.each(data, function(i, data){
          if (message_id > id ) {
            insertHTML += buildHTML(data);
          }
        });
        $('.chat-main__body--messages-list').append(insertHTML)
        $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast')
      });
    }
  });
});
