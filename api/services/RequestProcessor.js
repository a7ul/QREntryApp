module.exports = (function () {

  var RequestProcessor = function() {

    var globals = {};

    this.processAttendanceRequest = function (req, attended, callback) {
      var userId = parseInt(req.body.userId);
      globals.attended = attended;
      globals.callback = callback;
      return updateUser(userId);
    };

    var emitEvent = function (eventName, data) {
      sails.io.sockets.emit(eventName, data);
    };

    var getAttendanceAction = function (updated) {
      if (globals.error) return {
        action: 'negotiate',
        data: globals.error
      };
      if (globals.attended.toLowerCase() === 'yes') return {
        action: 'end',
        data: 'Welcome ' + updated.name
      };

      if (globals.attended.toLowerCase() === 'no') return {
        action: 'json',
        data: updated
      };
    };

    var handleUpdate = function (err, updated) {
      console.log('updated user :', updated);
      globals.error = err;
      emitEvent('userUpdated', updated[0]);
      var attendanceAction = getAttendanceAction(updated[0]);
      globals.callback(attendanceAction.action, attendanceAction.data);
    };

    var handleFind = function(err, found){
      if(err){
        return globals.callback('negotiate', err);
      }
      globals.callback('json', found);
    };

    var updateUser = function (userId) {
      User.update({userId: userId}, {attended: globals.attended}, handleUpdate);
    };

    this.findAllUsers = function (callback) {
      globals.callback = callback;
      User.find({}, handleFind);
    };

    //--test--  For test purposes only
    this.test = {
      getAttendanceAction : getAttendanceAction,
      handleUpdate : handleUpdate,
      handleFind : handleFind,
      updateUser : updateUser
    };
    //--endtest-- should be deleted during production
  };


	return {
		RequestProcessor : RequestProcessor
	};

})();
