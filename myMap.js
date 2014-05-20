var interactiveMap = function( _divContainer , _fileJson){

  var divContainer = _divContainer;
  var jsonDataUrl = _fileJson;


  // params Map
  var centreCarte = new google.maps.LatLng(44.936317,-0.8309490000000324);
  var mapOptions = {
      zoom: 3,
      center: centreCarte,
      minZoom : 3,
     
    } 
  var map = new google.maps.Map(document.getElementById(divContainer), mapOptions);
  var image = new google.maps.MarkerImage('img/marker_red.png',
            new google.maps.Size(65, 124),
            new google.maps.Point(0,0),
            new google.maps.Point(0,0)
  );    
  var infoWindow = new google.maps.InfoWindow; 
  var containerInfoDom = $('div.displayData');

  this.initialize = function() {    

    getMydataJson();
	//console.log('oo');
  }

  var getMydataJson = function( callback){

    // Load external Json file ( dataProvider)
    $.getJSON( jsonDataUrl, callback)
    .done(function( jsonData ) {
          // if success : place marker on the
          placeMarkerData( jsonData)     
      }).fail(function( jqxhr, textStatus, error ) {
          // else if error : show message in console
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
      });

  }



  var placeMarkerData = function ( dataGeo){
    // Display data on map
    var myMarker; var markers = []
    for (var i in dataGeo){
        myMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(dataGeo[i].coordinate[0] , dataGeo[i].coordinate[1]),
        title: dataGeo[i].name,
        icon: image,
        name: "<h2 class='popupTitle' style='width:500px; height:20px;'  > " + dataGeo[i].name + " </h2>" +
              "<img class='imgLogo' src = '" + dataGeo[i].picture + "' />"+
              "<h3> from: " + dataGeo[i].company + " | age: " + dataGeo[i].age + "</h3>" +
              "<h4> " + dataGeo[i].email + "</h4>" + 
              "<button class='seeDetail'> See all profile </button> ",
        content:"<p> " + dataGeo[i].phone + "</p>" + 
              "<p> " + dataGeo[i].address + "</p>" +
              "<div class='textPopup' > " + dataGeo[i].about + "</div>" 
      });
        markers.push(myMarker);
        createInfoBull (map , infoWindow , myMarker.name , myMarker , myMarker.content);
    }
  }
  function displayAllProfile(currentProfil){
    console.log(currentProfil)
    $('div.displayData').text(currentProfil);
  }

  function createInfoBull(map , infoWindow, contentString, marker , content){
    // create event 'click' n each infoWindow
    google.maps.event.addListener(marker , 'click' , function(){
      infoWindow.setContent(contentString);
      infoWindow.open(map , marker);

      $("button.seeDetail").on('click' , function(){
        containerInfoDom.empty();
        containerInfoDom.append(contentString).append(content);
        containerInfoDom.find("img.imgLogo").remove();
        containerInfoDom.find("button.seeDetail").remove();
      })
    })

  }
  // Open info Window
    var onMarkerClick = function() {
      var marker = this;
      console.log(this)
      var title = marker.title;
      var name = marker.name;
      var myContent = [name , title].join('');
      infoWindow.setContent(myContent);
      infoWindow.open(map, marker);
    };    

    // event To close Popup
    google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
    });
}








//* instance


