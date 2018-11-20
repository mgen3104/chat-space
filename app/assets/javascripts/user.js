$(document).on('turbolinks:load', function() {
  $(function() {
  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>
                `
      search_list.append(html);
    }

    function appendNoUser(user) {
      var html = `
                  <div>${ user }</div>
                  `
      search_list.append(html);
    }

    function addUser(id, name){
      var html = `
                  <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                    <input name='group[user_ids][]' type='hidden' value='${id}'>
                    <p class='chat-group-user__name'>${name}</p>
                    <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id=${id} data-user-name=${name}>削除</a>
                  </div>
                  `
      return html;
    }

    $("#user-search-field").on("keyup", function(e) {
      e.preventDefault();
      var input = $.trim($("#user-search-field").val());

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーはいません");
        }
      })
      .fail(function() {
        alert('error');
      })
    });

    $(".edit_group").on("click", ".user-search-add", function(e){
      var user_id = $(this).data('user-id');
      var user_name = $(this).data('user-name');
      $(this).parent().remove()
      addhtml = addUser(user_id, user_name)
      $('#chat-group-users').append(addhtml)
    });

    $(document).on("click", ".user-search-remove", function(e){
      $(this).parent().remove()
    });
  });
})
