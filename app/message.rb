class Message < ActiveRecord::Base
  belongs_to :user #user_id
  belongs_to :receiver, class_name: "User" #receiver_id

  def self.send_message(sender, receiver, message)
    raise ArgumentError, "Must provide a user" if !sender.is_a?(User) || !receiver.is_a?(User)
    Message.create(
      user_id: sender.id,
      receiver_id: receiver.id,
      content: message
    )
  end
end
