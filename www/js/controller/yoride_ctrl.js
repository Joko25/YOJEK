app.controller('yorideCtrl', function($scope, $state, $cordovaGeolocation, $ionicModal) {
 var options = {timeout: 10000, enableHighAccuracy: true};
 $scope.tarif = 'Rp. 0';

 $scope.goBack = function(){
  $state.go('app.dash');
 };

  $scope.disableTap = function() {
    //alert("as");
    var container = document.getElementsByClassName('pac-container');
    angular.element(container).attr('data-tap-disabled', 'true');
    var backdrop = document.getElementsByClassName('backdrop');
    angular.element(backdrop).attr('data-tap-disabled', 'true');
    angular.element(container).on("click", function() {
      document.getElementById('search').blur();
    });
  };

  $ionicModal.fromTemplateUrl('templates/modal-yoride.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeModal = function() {
    $scope.modal.hide();
    id1 = "not";
  };

 var id1 = "not";

 $scope.onSearchChange1 = function(){
    if (id1 == "not") {
      console.log("popup");
      $scope.modal.show();
      id1="yes";

      var inpurdari = document.getElementById('inpurdari');
      var searchDari = new google.maps.places.SearchBox(inpurdari);
    }
 };

 $scope.modalData = {};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var service = new google.maps.DistanceMatrixService();
 
    var mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 15,
      // streetViewControl: false,
      draggable: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      // styles: [
      //       {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      //       {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      //       {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      //       {
      //         featureType: 'administrative.locality',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#d59563'}]
      //       },
      //       {
      //         featureType: 'poi',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#d59563'}]
      //       },
      //       {
      //         featureType: 'poi.park',
      //         elementType: 'geometry',
      //         stylers: [{color: '#263c3f'}]
      //       },
      //       {
      //         featureType: 'poi.park',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#6b9a76'}]
      //       },
      //       {
      //         featureType: 'road',
      //         elementType: 'geometry',
      //         stylers: [{color: '#38414e'}]
      //       },
      //       {
      //         featureType: 'road',
      //         elementType: 'geometry.stroke',
      //         stylers: [{color: '#212a37'}]
      //       },
      //       {
      //         featureType: 'road',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#9ca5b3'}]
      //       },
      //       {
      //         featureType: 'road.highway',
      //         elementType: 'geometry',
      //         stylers: [{color: '#746855'}]
      //       },
      //       {
      //         featureType: 'road.highway',
      //         elementType: 'geometry.stroke',
      //         stylers: [{color: '#1f2835'}]
      //       },
      //       {
      //         featureType: 'road.highway',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#f3d19c'}]
      //       },
      //       {
      //         featureType: 'transit',
      //         elementType: 'geometry',
      //         stylers: [{color: '#2f3948'}]
      //       },
      //       {
      //         featureType: 'transit.station',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#d59563'}]
      //       },
      //       {
      //         featureType: 'water',
      //         elementType: 'geometry',
      //         stylers: [{color: '#17263c'}]
      //       },
      //       {
      //         featureType: 'water',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#515c6d'}]
      //       },
      //       {
      //         featureType: 'water',
      //         elementType: 'labels.text.stroke',
      //         stylers: [{color: '#17263c'}]
      //       }
      //     ]
    };

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    // var inpurdari = document.getElementById('inpurdari');

    //console.log(inpurdari);
    var search = document.getElementById('search');
    var inputtuj = document.getElementById('tuj-input');
    //var searchDari = new google.maps.places.SearchBox(inpurdari);
    var searchBox = new google.maps.places.SearchBox(input);
    var searchBoxtuj = new google.maps.places.SearchBox(inputtuj);

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(search);
    directionsDisplay.setMap($scope.map);

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
      //console.log(directionsService+' '+directionsDisplay);
    };
    //document.getElementById('pac-input').addEventListener('change', onChangeHandler);
    document.getElementById('tuj-input').addEventListener('change', onChangeHandler);

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      var start = document.getElementById('pac-input').value;
      var end = document.getElementById('tuj-input').value;

      if (start == '') {
        start = latLng;
      }

      console.log(start+' '+end);

      directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          calculateDistances(start, end);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    function callback(response, status) {
      console.log(response);
      if (status != google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
      } else {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          // var outputDiv = document.getElementById('outputDiv');
          //outputDiv.innerHTML = '';
          //deleteOverlays();
          // $scope.tarif = response.rows[0].elements[0].distance.text;
          // console.log($scope.tarif);
          var jrk = response.rows[0].elements[0].distance.text;
          var jarak = parseFloat(jrk.replace(/km/g,''));
          var jarak_awal = 5;
          var harga = 0;
          var harga_awal = 8000;

          if (jarak > jarak_awal) {
            var sisa_jarak = jarak - jarak_awal;
            harga = parseFloat(sisa_jarak*2000) + harga_awal;
          }else{
            harga = 8000;
          }

          harga = harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          document.getElementById("tarif").innerHTML = "Tarif : Rp. "+harga+";<br/> Jarak ("+jrk+")";
          console.log(response.rows[0].elements[0].duration.text);
          console.log(response.rows[0].elements[0].distance.text); 
      }
    }

    function calculateDistances(start, end) {
      // var start = document.getElementById('pac-input').value; 
      // var end = document.getElementById('tuj-input').value;
      service.getDistanceMatrix(
      { 
          origins: [start],
          destinations: [end],
          travelMode: google.maps.TravelMode.DRIVING, 
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
      }, callback);
    }
 
    //$scope.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(inputtuj);

    var icon = {
      url: 'img/ripple.gif', // url
      scaledSize: new google.maps.Size(70, 70)
              
    };

    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng,
          icon: icon,
          optimized: false
      });
     
    });
 
  }, function(error){
    console.log("Could not get location");
  });
});