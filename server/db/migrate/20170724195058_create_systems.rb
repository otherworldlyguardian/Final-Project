class CreateSystems < ActiveRecord::Migration[5.1]
  def change
    create_table :systems do |t|
      t.string :name
      t.integer :region_id
      t.integer :constellation_id
      t.integer :solar_id
      t.string :security

      t.timestamps
    end
  end
end
