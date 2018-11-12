$(function(){
  function buildHTML(message){
    var html = `
                .chat-main__message
                  .chat-main__message-name
                    = ${message.user_name}
                  .chat-main__message-time
                    = l message.created_at, format: :long
                  - if message.content.present?
                    %p.chat-main__message-body
                      = ${message.content}
                  = image_tag message.image.url, class: 'lower-message__image' if message.image.present?
                `
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    console.log(this)
    var formData = new FormData(this);
    var href = '/groups/' + ${message.group_id} + '/messages'
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
      $('.message').append(html)
      $('.message').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
});
