API.on(API.ADVANCE, callback);

function callback () {

	var a = API.getMedia().cid;
	setTimeout(function() {
	    var b = API.getMedia().cid;
	    if (a === b) {
		if (API.getDJ().id == API.getUser().id) {
		        $.ajax({type: "POST", url: "/_/booth/skip/me"});
		}
		else {
			API.moderateForceSkip(); //if rank is below 2, this won't work, but won't cause any problems either
		}
	    }
	}, (API.getMedia().duration * 1000) + 5000);

}

API.sendChat("/me AutoSkip enabled!");

/*	Original Code from Radiant ( https://code.radiant.dj/forceskip.js ), edited by Flybel
 	If the track is stuck, this script will automatically skip it. Bouncers and above
	will skip any song, below will skip their own song. */
