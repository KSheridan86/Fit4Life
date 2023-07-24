class CreateWorkouts < ActiveRecord::Migration[7.0]
  def change
    create_table :workouts do |t|
      t.integer :length
      t.integer :calories_burned
      t.text :exercises
      t.string :difficulty
      t.float :weight_after
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
