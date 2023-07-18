module Api
    class ProfilesController < ApplicationController
        before_action :authenticate_user!
        before_action :set_current_user

        def index
            @profiles = current_user.profiles
            render json: @profiles
        end

        def show
            @profile = current_user.profiles.find(params[:id])
            render json: @profile
        end

        def create
            @profile = current_user.build_profile(profile_params)
            if @profile.save
                render json: @profile, status: :created
            else
                render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
            end
        end

        def update
            @profile = current_user.profiles.find(params[:id])
            if @profile.update(profile_params)
                render json: @profile
            else
                render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
            end
        end

        def destroy
            @profile = current_user.profiles.find(params[:id])
            @profile.destroy
            head :no_content
        end

        private

        def set_current_user
            @current_user ||= User.find_by(authentication_token: request.headers['Authorization'])
        end

        def profile_params
            params.require(:profile).permit(:age, :height, :weight, :gender, :goal_weight, :goal_time_frame)
        end
    end
end
