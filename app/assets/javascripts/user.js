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
    var html = `<li>
                  <div class='listview__element--right-icon'>${ product }</div>
                </li>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function(e) {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/groups/new',
      data: { keyword: input },
      dataType: 'json',
      processData: false,
      contentType: false
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
      console.log('error');
    })
  });
});
