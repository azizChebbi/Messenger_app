const moment = require('moment');

function formatMessage(username, text ,messageTime) {
  return {
    username,
    text,
    time: messageTime
  };
}

module.exports = formatMessage;