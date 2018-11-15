$(function(){
  function buildHTML(message){
    var html = `
                <div class="chat-main__message">
                  <div class="chat-main__message-name">${message.user_name}</div>
                  <div class="chat-main__message-time">${message.created_at}</div>
                  <p class="chat-main__message-body">${message.content}</p>
                  <img class="lower-message__image" src=${message.image} width="128">
                </div>
                `
    return html;
  }
  $('#new_message').on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body--messages-list').append(html)
      $('.message').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
});
