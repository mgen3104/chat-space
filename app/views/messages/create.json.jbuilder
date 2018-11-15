  json.content  @message.content
  json.image  @message.image.url if @message.image.url
  json.group_id  @message.group_id
  json.user_name  @message.user.name
  json.created_at  l @message.created_at, format: :long
