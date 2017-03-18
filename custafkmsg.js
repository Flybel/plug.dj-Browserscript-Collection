/* Custom additional AFK message
Commands: /afk (message/reset), /afkmsg, /mention (reset) */

var customAfk = false;
var customAfkMessage = '';
var noNewAfk = false;
var mentionCount = 0;

if ( customAfk == false ) {
  API.chatLog('AFK launched. Not AFK.');
}
else {
  API.chatLog('AFK launched. AFK.');
}

API.on(API.CHAT_COMMAND, data => {
	var args = data.split(" ");
  if ( args[0] == '/mention' && args[1] == 'reset' ) {
    mentionCount = 0;
    if ( customAfk ) {
      API.chatLog('Mention count reset; AFK is enabled');
    }
    else {
      API.chatLog('Mention count reset; AFK is disabled');
    }
  }
  else if ( args[0] == '/mention' && args[1] == undefined ) {
    if ( customAfk ) {
      API.chatLog('Mentioned ' + mentionCount + ' times; AFK is enabled');
    }
    else {
      API.chatLog('Mentioned ' + mentionCount + ' times; AFK is disabled');
    }
  }
  else if ( args[0] == '/afkmsg' ) {
    if ( customAfk ) {
      API.chatLog('Current AFK message: ' + customAfkMessage + '; AFK is enabled');
    }
    else {
      API.chatLog('Current AFK message: ' + customAfkMessage + '; AFK is disabled');
    }
  }
  else if ( args[0] == '/afk' && args[1] == 'reset' ) {
    customAfkMessage = '';
    if ( customAfk ) {
      API.chatLog('AFK message cleared; AFK is enabled');
    }
    else {
      API.chatLog('AFK message cleared; AFK is disabled');
    }
  }
  else if ( args[0] == '/afk' && args[1] != null ) {
    customAfkMessage = data.replace('/afk ', '');
    if ( customAfk ) {
      API.chatLog('AFK message updated, message: ' + customAfkMessage + '; AFK is enabled');
    }
    else {
      API.chatLog('AFK message updated, message: ' + customAfkMessage + '; AFK is disabled');
    }
  }
  else if ( args[0] == '/afk' && !customAfk ) {
    API.chatLog('AFK enabled');
		customAfk = true;
	}
  else if ( args[0] == '/afk' && customAfk ) {
    API.chatLog('AFK disabled');
		customAfk = false;
  }
} );

API.on(API.CHAT, data => {
  if ( data.message.includes('@' + API.getUser().username) && customAfk && data.uid != API.getUser().id && !noNewAfk ) {
    var theDate = new Date();
    var theHour = theDate.getHours();
    var theMinute = theDate.getMinutes();
    noNewAfk = true;
    mentionCount++;
    setTimeout ( function() {
      if ( theMinute < 10 ) {
        API.sendChat('@' + data.un + " [it's " + theHour + ':0' + theMinute + ' in my area] ' + customAfkMessage);
      }
      else {
        API.sendChat('@' + data.un + " [it's " + theHour + ':' + theMinute + ' in my area] ' + customAfkMessage);
      }
      setTimeout ( function() {
        noNewAfk = false;
      }, 30000);
    }, 1000);
  }
} );
