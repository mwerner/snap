class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :username,           null: false
      t.string :encrypted_password, null: false
      t.timestamps                  null: false
    end
    add_index :users, :username
  end
end
