class AddUserToIntake < ActiveRecord::Migration[7.0]
  def change
    add_reference :intakes, :user, null: false, foreign_key: true
  end
end
