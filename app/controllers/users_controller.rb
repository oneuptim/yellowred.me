class UsersController < ApplicationController
  
  def new
    @user = User.new
    @profile = Profile.new
    render :new
  end

  def create
    @user = User.new(params[:user])
    @user.profile = Profile.new(:username => params[:username])
    @user.saved_search = SavedSearch.new
    
    if @user.save
      login_user!
      redirect_to edit_profile_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
end
