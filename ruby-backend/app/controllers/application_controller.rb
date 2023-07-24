class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?
    protect_from_forgery with: :exception, unless: -> { request.format.json? }
  
    protected
  
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :password, :password_confirmation])
      devise_parameter_sanitizer.permit(:account_update, keys: [:email, :password, :password_confirmation, :current_password])
    end
  
    def after_sign_out_path_for(resource_or_scope)
      new_user_session_path
    end
  
    def after_sign_in_path_for(resource_or_scope)
      root_path
    end
  
    def after_sign_up_path_for(resource)
      new_profile_path
    end
  
    def after_update_path_for(resource)
      edit_profile_path
    end
  
    def destroy
      current_user.destroy
      Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
      set_flash_message! :notice, :destroyed
      yield resource if block_given?
      respond_with_navigational(resource) { redirect_to after_sign_out_path_for(resource_name) }
    end
  end
  
