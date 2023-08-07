class DropCaloriesTable < ActiveRecord::Migration[7.0]
  def change
  end
  def up
    drop_table :calories
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
