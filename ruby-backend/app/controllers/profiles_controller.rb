class ProfilesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_profile, only: [:edit, :update, :destroy]
    before_action :require_profile_owner, only: [:edit, :update, :destroy]
    protect_from_forgery with: :exception, unless: -> { request.format.json? }
    
    def new
        @profile = current_user.profile || current_user.build_profile
    end

    def create
        @profile = current_user.build_profile(profile_params)
        if @profile.save
            redirect_to root_path, notice: 'Profile created successfully!'
        else
            render :new
        end
    end

    def edit
        # The 'set_profile' method will set @profile based on the current user.
    end
    
    def update
        if @profile.update(profile_params)
            redirect_to root_path, notice: 'Profile updated successfully!'
        else
            render :edit
        end
    end

    def destroy
        @profile.destroy
        redirect_to root_path, notice: 'Profile was successfully deleted.'
    end

    private

    def set_profile
        @profile = current_user.profile
    end

    def require_profile_owner
        unless current_user == @profile.user
            redirect_to root_path, alert: "You don't have permission to edit this profile."
        end
    end

    def require_profile_owner
        unless current_user == @profile.user
            flash[:alert] = 'You are not authorized to perform this action.'
            redirect_to root_path
        end
    end

    def profile_params
        params.require(:profile).permit(:age, :height, :weight, :gender, :goal_weight, :goal_time_frame)
    end
end
