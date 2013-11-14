YellowRed.profile_button_responses = {
  
	activateProfileCard: function(event) {
		if (!$(event.target).is("button")) {
      $(event.currentTarget).toggleClass("profile-card-active");
		}
	},
	
	linkProfile: function(event) {
		if (!$(event.target).is("button")) {
      $(event.currentTarget).toggleClass("profile-card-active", false);
			var username = $(event.currentTarget).attr("data-username");
			YellowRed.appRouter.navigate(username, {trigger: true});	
		}
	},
  
	starProfile: function(event) {
    var that = this;
    var starButton = $(event.currentTarget)
		var profileId = starButton.attr("data-id");
    
		$.ajax({
			url: "stars",
			type: "post",
			data: { 
				profile_id: profileId
			},
			success: function(res) {
        var profile = that.model || that.collection.get(profileId);
        YellowRed.starred_profiles.add(profile);
        
        var stars_count = profile.get('stars_count');
        profile.set({
          starred: true,
          stars_count: stars_count + 1
        });
			} 
		});
	},
  
  unStarProfile: function(event) {
    var that = this;
    var unStarButton = $(event.currentTarget)
		var profileId = unStarButton.attr("data-id");
    
		$.ajax({
			url: "stars/" + profileId,
			type: "delete",
			success: function(res) {
        var profile = that.model || that.collection.get(profileId);
        YellowRed.starred_profiles.add(profile);
                
        var stars_count = profile.get('stars_count');
        profile.set({
          starred: false,
          stars_count: stars_count - 1
        })
			} 
		});
  },

	maybeProfile: function(event) {
    var that = this;
		var profileId = $(event.currentTarget).attr("data-id");
		$.ajax({
			url: "maybes",
			type: "post",
			data: { 
				maybe: { 
					profile_id: profileId,
					prefer: true
				}
			},
			success: function(res) {
        var profile = that.model || that.collection.get(profileId);
				YellowRed.maybe_profiles.add(profile);
				YellowRed.nope_profiles.remove(profile);
        YellowRed.searched_profiles.remove(profile);
        
        $(".maybe[data-id='" + profileId + "']").toggleClass("unmaybe", true);
        $(".unmaybe[data-id='" + profileId + "']").toggleClass("maybe", false);
        $(".unmaybe[data-id='" + profileId + "']").text("unMaybe");
        
        $(".unnope[data-id='" + profileId + "']").toggleClass("nope", true);
        $(".nope[data-id='" + profileId + "']").toggleClass("unnope", false);
        $(".nope[data-id='" + profileId + "']").text("Nope");
			}
		});
	},
  
  unMaybeProfile: function(event) {
    var that = this;
    var unMaybeButton = $(event.currentTarget)
		var profileId = unMaybeButton.attr("data-id");
		$.ajax({
			url: "maybes/" + profileId,
			type: "delete",
			success: function(res) {
        var profile = that.model || that.collection.get(profileId);
				YellowRed.maybe_profiles.remove(profile);
        YellowRed.searched_profiles.add(profile);
        
        $(".unmaybe[data-id='" + profileId + "']").toggleClass("maybe", true);
        $(".maybe[data-id='" + profileId + "']").toggleClass("unmaybe", false);
        $(".maybe[data-id='" + profileId + "']").text("Maybe");
			}, 
		});
  },

	nopeProfile: function(event) {
    var that = this;
		var profileId = $(event.currentTarget).attr("data-id");
		$.ajax({
			url: "maybes",
			type: "post",
			data: { 
				maybe: { 
					profile_id: profileId,
					prefer: false
				}
			},
			success: function(res) {
        var profile = that.model || that.collection.get(profileId);
				YellowRed.maybe_profiles.remove(profile);
				YellowRed.nope_profiles.add(profile);
        YellowRed.searched_profiles.remove(profile);
        
        $(".nope[data-id='" + profileId + "']").toggleClass("unnope", true);
        $(".unnope[data-id='" + profileId + "']").toggleClass("nope", false);
        $(".unnope[data-id='" + profileId + "']").text("unNope");
        
        $(".unmaybe[data-id='" + profileId + "']").toggleClass("maybe", true);
        $(".maybe[data-id='" + profileId + "']").toggleClass("unmaybe", false);
        $(".maybe[data-id='" + profileId + "']").text("Maybe");
			}
		});
	},
  
  unNopeProfile: function(event) {
    var that = this;
    var unMaybeButton = $(event.currentTarget)
		var profileId = unMaybeButton.attr("data-id");
		$.ajax({
			url: "maybes/" + profileId,
			type: "delete",
			success: function(res) {
        var profile = that.model || that.collection.get(profileId);
				YellowRed.nope_profiles.remove(profile);
        YellowRed.searched_profiles.add(profile);
        
        $(".unnope[data-id='" + profileId + "']").toggleClass("nope", true);
        $(".nope[data-id='" + profileId + "']").toggleClass("unnope", false);
        $(".nope[data-id='" + profileId + "']").text("Nope");
			}, 
		});
  },
  
};
