class Profile < ApplicationRecord
  belongs_to :user
  
  # Custom validation for height in inches
  validates :height, presence: true, numericality: { greater_than: 0 }
  validate :height_in_inches

  # Custom validation for weight in kilograms
  validates :weight, presence: true, numericality: { greater_than: 0 }
  validate :weight_in_kilograms

  # Custom validation for goal_weight in kilograms
  validates :goal_weight, presence: true, numericality: { greater_than: 0 }
  validate :goal_weight_in_kilograms

  # Custom validation for goal_time_frame in weeks
  validates :goal_time_frame, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validate :goal_time_frame_in_weeks

  private

  # Custom validation method to ensure height is in inches
  def height_in_inches
    return unless height.present?

    if height < 12
      errors.add(:height, "Height must be greater than or equal to 12 inches.")
    end
  end

  # Custom validation method to ensure weight is in kilograms
  def weight_in_kilograms
    return unless weight.present?

    if weight < 1
      errors.add(:weight, "Weight must be greater than or equal to 1 kilogram.")
    end
  end

  # Custom validation method to ensure goal_weight is in kilograms
  def goal_weight_in_kilograms
    return unless goal_weight.present?

    if goal_weight < 1
      errors.add(:goal_weight, "Goal weight must be greater than or equal to 1 kilogram.")
    end
  end

  # Custom validation method to ensure goal_time_frame is in weeks
  def goal_time_frame_in_weeks
    return unless goal_time_frame.present?

    weeks = goal_time_frame.to_i
    if weeks < 1
      errors.add(:goal_time_frame, "Goal time frame must be greater than or equal to 1 week.")
    end
  end
end
