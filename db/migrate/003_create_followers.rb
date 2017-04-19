class CreateFollowers < ActiveRecord::Migration
  def change
    create_table :relationships do |t|
      t.integer :follower_id, null: false, index: true
      t.integer :leader_id,   null: false, index: true
      t.timestamps            null: false
    end
  end
end
