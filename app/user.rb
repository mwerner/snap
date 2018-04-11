class User < Sinatra::Rider::User
  has_many :leaderships, class_name: 'Relationship', foreign_key: :leader_id
  has_many :followers, class_name: 'User', through: :leaderships, source: :follower

  has_many :followships, class_name: 'Relationship', foreign_key: :follower_id
  has_many :leaders, class_name: 'User', through: :followships, source: :leader
  has_many :snaps

  has_many :messages, foreign_key: :receiver_id

  def stories
    Snap.joins(:sends).where("snap_sends.user_id" => id, "snap_sends.receiver_id" => nil)
  end

  def start_following(user)
    return if user.nil?
    Relationship.where(leader_id: user.id, follower_id: id).first_or_create
  end

  def stop_following(user)
    return if user.nil?
    Relationship.where(leader_id: user.id, follower_id: id).destroy_all
  end
end
