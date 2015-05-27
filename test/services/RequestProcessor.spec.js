describe('RequestProcessor', function(){

  var chai = require('chai');
  var spies = require('chai-spies');
  chai.use(spies);
  var expect = chai.expect;
  var assert = chai.assert;
  var processor;
  //var spyOn = function(methodNames){
  //  for(var i = 0 ; i < methodNames.length ; i++){
  //    processor.test[methodNames[i]] = chai.spy(processor.test[methodNames[i]]);
  //  }
  //};
  //var stubAndSpy = function(methodNames){
  //  for(var i = 0 ; i < methodNames.length ; i++){
  //    processor.test[methodNames[i]] = chai.spy();
  //  }
  //};

  beforeEach(function(){
    processor = new RequestProcessor.RequestProcessor();
    processor.test.globals.callback = chai.spy();
    sails.io.sockets.emit = chai.spy();
    User.find = chai.spy();
    User.update = chai.spy();
  });

  describe('get attendance action', function(){
    it('returns welcome for yes', function(){
      processor.test.globals.attended = 'yes';
      assert.deepEqual(processor.test.getAttendanceAction({name:'John'}),{action:'end',data:'Welcome John'});
    });

    it('returns welcome for yes case insensitive', function(){
      processor.test.globals.attended = 'yEs';
      assert.deepEqual(processor.test.getAttendanceAction({name:'John'}),{action:'end',data:'Welcome John'});
    });

    it('returns removed for no', function(){
      processor.test.globals.attended = 'no';
      assert.deepEqual(processor.test.getAttendanceAction({name:'John'}),{action:'end',data:'John removed'});
    });

    it('returns removed for no case insensitive', function(){
      processor.test.globals.attended = 'NO';
      assert.deepEqual(processor.test.getAttendanceAction({name:'John'}),{action:'end',data:'John removed'});
    });

    it('returns error if globals.error exists', function(){
      processor.test.globals.attended = 'no';
      processor.test.globals.error = 'error';
      assert.deepEqual(processor.test.getAttendanceAction({name:'John'}),{action:'negotiate',data:'error'});
    });
  });

  describe('handle Update', function(){
    it('calls the callback',function() {
      processor.test.globals.attended = 'no';
      processor.test.handleUpdate(undefined, [{name:'John'}]);
      expect(processor.test.globals.callback).to.have.been.called.with('end','John removed');
    });
    it('calls the socket emit function',function() {
      processor.test.globals.attended = 'no';
      processor.test.handleUpdate(undefined, [{name:'John'}]);
      expect(sails.io.sockets.emit).to.have.been.called();
    });
  });

  describe('handle Find', function(){
    it('calls the callback',function() {
      processor.test.globals.attended = 'no';
      processor.test.handleFind(undefined, [{name:'John'}]);
      expect(processor.test.globals.callback).to.have.been.called.with('json',[{name:'John'}]);
    });
    it('calls the callback wih error',function() {
      processor.test.globals.attended = 'no';
      processor.test.handleUpdate('some error', [{name:'John'}]);
      expect(processor.test.globals.callback).to.have.been.called.with('negotiate','some error');
    });
  });

  describe('process attendance request', function(){
    it('appropriately sets userId to a number', function(){
      processor.test.updateUser = chai.spy();
      var req = {
        body : {
          userId : '1'
        }
      };
      processor.processAttendanceRequest(req,null,null);
      expect(User.update).to.have.been.called.with({userId:1});
    });
    it('assigns globals properly', function(){
      processor.test.updateUser = chai.spy();
      var req = {
        body : {
          userId : '1'
        }
      };
      processor.processAttendanceRequest(req,'yes','samplecallback');
      expect(processor.test.globals.attended).to.eq('yes');
      expect(processor.test.globals.callback).to.eq('samplecallback');
    });
  });

  describe('find all users', function(){
    it('sets callback', function(){
      processor.findAllUsers('samplecallback');
      expect(processor.test.globals.callback).to.eq('samplecallback');
    });
    it('calls find fn', function(){
      processor.findAllUsers('samplecallback');
      expect(User.find).to.have.been.called();
    });
  });

});
