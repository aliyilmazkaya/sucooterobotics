window.lat = 41.041809;
window.lng = 29.009586;

var map;
var mark;
var lineCoords = [];
  
var initialize = function() {
  map  = new google.maps.Map(document.getElementById('map-canvas'), {center:{lat:lat,lng:lng},zoom:12});
  mark = new google.maps.Marker({position:{lat:lat, lng:lng}, map:map});
};

window.initialize = initialize;

var redraw = function(payload) {
  if(payload.message.lat){
  lat = payload.message.lat;
  lng = payload.message.lng;

  map.setCenter({lat:lat, lng:lng, alt:0});
  mark.setPosition({lat:lat, lng:lng, alt:0});
  
  lineCoords.push(new google.maps.LatLng(lat, lng));

  var lineCoordinatesPath = new google.maps.Polyline({
    path: lineCoords,
    geodesic: true,
    strokeColor: '#2E10FF'
  });
  
  lineCoordinatesPath.setMap(map);}
};

var pnChannel = "raspi-tracker";

var pubnub = new PubNub({
  publishKey:   'pub-c-ae6fe267-47f3-45d6-8258-2aa525d31e81',
  subscribeKey: 'sub-c-7b55dd4a-90c4-11ec-b249-a68c05a281ab'
});
    
document.querySelector('#action').addEventListener('click', function(){
    var text = document.getElementById("action").textContent;
    if(text == "Go"){
        pubnub.subscribe({channels: [pnChannel]});
        pubnub.addListener({message:redraw});
        document.getElementById("action").classList.add('btn-danger');
        document.getElementById("action").classList.remove('btn-success');
        document.getElementById("action").textContent = 'Stop';
    }
    else{
        pubnub.unsubscribe( {channels: [pnChannel] });
        document.getElementById("action").classList.remove('btn-danger');
        document.getElementById("action").classList.add('btn-success');
        document.getElementById("action").textContent = 'Go';
    }
    });



// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
}