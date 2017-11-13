app.controller('dashCtrl', function($scope, $state, $cordovaGeolocation) {
  $scope.yoRide  = function(){
    $state.go("app.yoride");
  }
});