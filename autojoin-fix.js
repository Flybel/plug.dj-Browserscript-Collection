/* There is an issue with RCS Autojoin. This will do the job. --
Thank you to @Brinkie "??????" Pie#5984 for adding to this code.
User does /autojoinon and /autojoinoff. Staff does !autojoinon and !autojoinoff.
Room description @autojoinon and @autojoinoff are accepted.
AutoJoin running by default can be changed by /ajdefaulton and /ajdefaultoff.
@version v2.3 */

var run = false;
var join = null;
var roomName

try {
    disabledRooms = JSON.parse(localStorage.flybelDisabledRooms ||'{}');
} catch(e) {
    disabledRooms = {};
}

if ( localStorage.flybelDefaultJoin === undefined ) {
  localStorage.flybelDefaultJoin = 2;
}
defaultJoin = localStorage.flybelDefaultJoin;

function setDefaultOn() {
  defaultJoin = 2;
  localStorage.flybelDefaultJoin = defaultJoin;
}

function setDefaultOff() {
  defaultJoin = 1;
  localStorage.flybelDefaultJoin = defaultJoin;
}

function disableRoom(roomName) {
  if ( !isDisabledRoom(roomName) ) {
    disabledRooms[roomName] = true;
    localStorage.flybelDisabledRooms = JSON.stringify(disabledRooms);
    return true;
  }
  else {
    return false;
  }
}
function enableRoom(roomName) {
  if ( isDisabledRoom(roomName) ) {
    disabledRooms[roomName] = false;
    localStorage.flybelDisabledRooms = JSON.stringify(disabledRooms);
    return true;
  }
  else {
    return false;
  }
}
function isDisabledRoom(roomName) {
    return disabledRooms[roomName];
}

function getRoomName () {
  roomName = window.location.href;
  roomName = roomName.replace('https://plug.dj/', '');
  if ( roomName.indexOf('#') != -1 ) {
    roomName = roomName.substring(0, roomName.indexOf('#'));
  }
  return roomName;
}

function interval (newstate) {
	if ( newstate ) {
		join = setInterval(function () {
      if ( rcs.settings.autoJoin ) {
        if ( API.getDJ() == null ) {
  				API.djJoin();
  			}
      }
      else if ( API.getDJ().id != API.getUser().id && API.getWaitListPosition() == -1 ) {
        API.djJoin();
      }
		}, 2000);
	}
	else {
		clearInterval(join);
	}
}

function getDescription () {
  $.getJSON('https://plug.dj/_/rooms/state', function ( data ) {
    var roomDetails = data.data[0].meta.description;
    if ( roomDetails.indexOf("@autojoinoff") > -1 ) {
      disableRoom(getRoomName());
      interval(false);
      run = false;
    }
    else if ( roomDetails.indexOf("@autojoinon") > -1 ) {
      enableRoom(getRoomName());
    }
  });
}

API.on(API.CHAT_COMMAND, data => {
	var args = data.split(" ");
	if ( args[0] == "/autojoinoff" && run ) {
    API.chatLog("AutoJoin disabled. Run /autojoinon to re-enable.");
		run = false;
		interval(false);
	}
	else if ( args[0] == "/autojoinon" && !run ) {
    if ( isDisabledRoom(getRoomName()) ) {
      API.chatLog("Sorry, but AutoJoin isn't allowed here.");
    }
    else {
      API.chatLog("AutoJoin enabled. Run /autojoinoff to disable.");
  		run = true;
  		interval(true);
    }
	}
  else if ( args[0] == "/ajdefaultoff" ) {
    setDefaultOff();
    API.chatLog("Preferences updated.");
  }
  else if ( args[0] == "/ajdefaulton" ) {
    setDefaultOn();
    API.chatLog("Preferences updated.");
  }
});

API.on(API.CHAT, data => {
  if ( (data.message == '!autojoinoff' || rcs.Utils.striphtml(data.message) == '!autojoinoff') && (API.getUser(data.uid).role > 1 || API.getUser(data.uid).gRole > 2) ) {
    if ( disableRoom(getRoomName()) ) {
      disableRoom(getRoomName());
      interval (false);
      run = false;
      API.sendChat("/me Ok, @" + data.un + " , I have disabled AutoJoin.");
    }
    else {
      API.sendChat("/me AutoJoin is already disabled in this room!");
    }
  }
  else if ( (data.message == '!autojoinoff' || rcs.Utils.striphtml(data.message) == '!autojoinoff') && (API.getUser(data.uid).role <= 1 && API.getUser(data.uid).gRole <= 2) ) {
    API.sendChat("/me Sorry, @" + data.un + " , you don't have permission to restrict me from using AutoJoin here!");
  }
  else if ( (data.message == '!autojoinon' || rcs.Utils.striphtml(data.message) == '!autojoinon') && (API.getUser(data.uid).role > 1 || API.getUser(data.uid).gRole > 2) ) {
    if ( enableRoom(getRoomName()) ) {
      enableRoom(getRoomName())
      API.sendChat("/me Thank you, @" + data.un + " , for allowing the use of AutoJoin again!");
    }
    else {
      API.sendChat("/me AutoJoin is already allowed in this room!");
    }
  }
  else if ( (data.message == '!autojoinon' || rcs.Utils.striphtml(data.message) == '!autojoinon') && (API.getUser(data.uid).role <= 1 && API.getUser(data.uid).gRole <= 2) ) {
    API.sendChat("/me Sorry, @" + data.un + " , you don't have permission to allow me to use AutoJoin here!");
  }
});

setTimeout ( function () {
  if (!isDisabledRoom(getRoomName())) {
    if ( defaultJoin == 2 ) {
      API.chatLog('AutoJoin enabled. Run /autojoinoff to disable.');
      interval(true);
      run = true;
    }
    else if ( defaultJoin == 1 ) {
      API.chatLog('AutoJoin Script launched. Run /autojoinon to enable.');
    }
  }
  else {
    API.chatLog('AutoJoin Script launched, but not allowed in this room.');
  }
}, 1000);

setInterval ( function () {
  getDescription();
  if ( isDisabledRoom() === run && isDisabledRoom() == true) {
    API.chatLog("AutoJoin forcibly disabled.");
		run = false;
		interval(false);
  }
}
, 30000);
