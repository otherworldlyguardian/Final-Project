class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.integer :eve_id
      t.integer :corp_id
      t.string :refresh_token

      t.timestamps
    end
  end
end
