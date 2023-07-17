class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.integer :age
      t.float :height
      t.float :weight
      t.string :gender
      t.float :goal_weight
      t.string :goal_time_frame
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
