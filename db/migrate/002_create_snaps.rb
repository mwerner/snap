class CreateSnaps < ActiveRecord::Migration
  def change
    create_table :snaps do |t|
      t.integer :user_id,    index: true
      t.string  :image_url,  null: false
      t.timestamps           null: false
    end

    create_table :snap_sends do |t|
      t.integer :user_id, null: false, index: true
      t.integer :snap_id, null: false, index: true
      t.integer :receiver_id, null: true
      t.timestamps        null: false
    end
  end
end
