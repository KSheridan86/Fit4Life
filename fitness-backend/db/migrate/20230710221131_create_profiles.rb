class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.string :name
      t.integer :age
      t.float :height
      t.float :weight
      t.string :sex
      t.float :target_weight
      t.date :target_date
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
