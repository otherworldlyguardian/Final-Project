class AddStaticColumnsToSystems < ActiveRecord::Migration[5.1]
  def change
    add_column :systems, :static1, :string
    add_column :systems, :static2, :string
  end
end
