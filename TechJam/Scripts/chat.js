$(function () {

    var hub = $.connection.chatHub;
    $.connection.chatHub.logging = true;
    getUserMedia({ video: true, audio: true }, function(stream) {
        startVideo(stream);
        initiateConnection(stream);
    }, function(event) {
        console.log(event);
    });

    function startVideo(stream) {
        var myVideo = document.getElementById('my-stream');
        attachMediaStream(myVideo, stream);
    }

    function initiateConnection(stream) {
        var connection = new RTCPeerConnection(null);
        
        connection.addStream(stream);
        connection.createOffer(function(sessionDesc) {
            connection.setLocalDescription(sessionDesc, function() {
                hub.server.sendOffer(JSON.stringify({ 'sdp': sessionDesc }));
            });
        }, function(error) {
            console.log(error);
        });
    }
});