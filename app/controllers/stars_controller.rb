class StarsController < ApplicationController
  
  def index
    @starred_profiles = current_user.starred_profiles
    render :json => @starred_profiles
  end
  
  def starred_me
    @starring_profiles = current_user.starring_profiles
    render :json => @starring_profiles
  end
  
  def create
    @star = Star.new(:profile_id => params[:profile_id], :user_id => current_user.id)
    if @star.save
      render :json => @star.profile, :status => 200
    else
      render :json => @star.errors.full_messages, :status => 422
    end
  end
  
  def destroy
    @star = Star.find(params[:star])
    if @star.destroy
      render :json => params[:star], :status => 200
    else
      render :json => @star.errors.full_messages, :status => 422
    end
  end
  
end
