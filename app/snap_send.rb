class SnapSend < ActiveRecord::Base
  belongs_to :user
  belongs_to :receiver, class_name: 'User'
  belongs_to :snap
end
