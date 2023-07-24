class WorkoutsController < ApplicationController
    before_action :set_workout, only: [:edit, :update, :destroy]
    protect_from_forgery with: :exception, unless: -> { request.format.json? }
  
    def new
      @workout = current_user.workouts.build
    end
  
    def create
      @workout = current_user.workouts.build(workout_params)
    
      if @workout.save
        redirect_to root_path, notice: 'Workout was successfully created.'
      else
        render :new
      end
    end
  
    def edit
    end
  
    def update
      if @workout.update(workout_params)
        redirect_to root_path, notice: 'Workout was successfully updated.'
      else
        render :edit
      end
    end
  
    def destroy
      @workout.destroy
      redirect_to root_path, notice: 'Workout was successfully deleted.'
    end
  
    private
  
    def set_workout
      @workout = Workout.find(params[:id])
    end
  
    def workout_params
      params.require(:workout).permit(:length, :calories_burned, :exercises, :difficulty, :weight_after, :user_id)
    end
  end
  