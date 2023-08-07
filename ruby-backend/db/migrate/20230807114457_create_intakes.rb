class CreateIntakes < ActiveRecord::Migration[7.0]
  def change
    create_table :intakes do |t|
      t.integer :breakfast
      t.integer :lunch
      t.integer :dinner
      t.integer :snacks
      t.datetime :date

      t.timestamps
    end
  end
end
