/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = (function () {

	var userAttended = function(req,res){
    var processor = new RequestProcessor.RequestProcessor();
		processor.processAttendanceRequest(req, 'yes', function(action, data){
			res[action](data);
		});
	};

	var userNotAttended = function(req,res){
    var processor = new RequestProcessor.RequestProcessor();
    processor.processAttendanceRequest(req, 'no', function(action, data){
			res[action](data);
		});
	};

	var findUser = function(req, res){
    var processor = new RequestProcessor.RequestProcessor();
    processor.findAllUsers(function(action, data){
			res[action](data);
		})
	};

	return {
		findUser : findUser,
		userAttended : userAttended,
		userNotAttended : userNotAttended
	}
})();
