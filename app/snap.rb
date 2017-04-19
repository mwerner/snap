class Snap < ActiveRecord::Base
  has_many :sends, class_name: 'SnapSend'
end
