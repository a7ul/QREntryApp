/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	findUser: function (req, res) {
		var giveResponse = function (err, found) {
			res.json(found);
			res.end();
		};
		var returnJson = User.find({}, giveResponse)
	},

	newUser: function (req, res) {
		var socket = req.socket;
		var io = sails.io;
		var userName = req.body.name;
		if (userName === undefined || userName === '') {
			return res.end('Please enter valid user');
		}
		var handleUserCreation = function (err, createdUser) {
			if (err) {
				return res.negotiate(err)
			}
			io.sockets.emit('newUserCreated', createdUser);
			return res.end('user ' + userName + ' created');
		};
		var userJson = {
			name: 'user' + userName,
			timeOfReg: new Date()
		}
		console.log(userName);
		User.create(userJson, handleUserCreation);
		//		res.end('User successfully registered')	
	},

	updateUser: function (req, res) {
		var oldName = req.body.oldName;
		var newName = req.body.newName;
		var attended = true;
		var handleUpdate = function (err, updated) {
			if (err) return res.negotiate(err);
			return res.json(updated[0]);
		};
		User.update({ name: oldName }, { name: newName, attended: attended }, handleUpdate);
	},

	userAttended: function(req, res) {
		var socket = req.socket;
		var io = sails.io;
		var userId = req.body.userId;
		userId = parseInt(userId);
		var handleUpdate = function (err, updated) {
			if (err) return res.negotiate(err);
			io.sockets.emit('userUpdated', updated[0]);
			return res.json(updated[0]);
		};
		User.update({ userId:userId }, { attended: 'Yes' }, handleUpdate);
	},
	
	userNotAttended: function(req, res) {
		var socket = req.socket;
		var io = sails.io;
		var userId = req.body.userId;
		userId = parseInt(userId);
		var handleUpdate = function (err, updated) {
			if (err) return res.negotiate(err);
			io.sockets.emit('userUpdated', updated[0]);
			return res.json(updated[0]);
		};
		User.update({ userId:userId }, { attended: 'No' }, handleUpdate);
	}

};

