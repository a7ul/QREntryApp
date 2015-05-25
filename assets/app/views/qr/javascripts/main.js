$(document).ready(function(){
  $('#reader').html5_qrcode(function(data){
      $.post( "http://localhost:1337/user/attended", {userId:data},function( data ) {
        alert(data);
        $('#read').html(data);

      });
    },
    function(error){
      $('#read_error').html(error);
    }, function(videoError){
      $('#vid_error').html(videoError);
    }
  );
});
