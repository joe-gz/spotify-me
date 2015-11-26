// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/
$(document).ready( function() {
  $(".submit").click(function(evt){
    evt.preventDefault();
    var keyword = $("input[id='search-keyword']").val();
    var option = $('#search-type').val();
    console.log(option);
    if (option === "artist") {
      searchByArtist(keyword);
    } else {
      searchByTrack(keyword)
    }
  })
})

function searchByArtist(keyword) {
  var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;
  ajax(url)
}

function searchByTrack(keyword) {
  var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;
  ajax(url)
}

var listArtists = function (response) {
  for (var i=0;i<response.artists.length;i++) {
    $('body').append(response.artists[i].name)
  }
}

var listTracks = function (response) {
  for (var i=0;i<response.tracks.length;i++) {
    $('body').append(response.tracks[i].name)
  }
}

var ajax = function (url){
  var option = $('#search-type').val();
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json"
  }).done ( function(response){
    console.log(response.option);
    if (option === "artist") {
      listArtists(response);
    } else {
      listTracks(response);
    }
  }).fail ( function (){
    console.log("Failure");
  }).always( function(){
    console.log("Something's happening");
  })
}
