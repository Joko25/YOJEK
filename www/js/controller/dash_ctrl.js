app.controller('dashCtrl', function($scope, $state, $cordovaGeolocation) {
  $scope.yoRide  = function(){
    $state.go("yoride");
  }
	$scope.options = {
      loop: false,
      effect: 'fade',
      speed: 500,
      autoplay:3500
    };


   // console.log(log);


    $scope.face = 'img/lg.png';
    $scope.face2 = 'img/lg2.png';

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
      $scope.slider = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
      //console.log('Slide change is beginning');
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
      // note: the indexes are 0-based
      $scope.activeIndex = data.slider.activeIndex;
      $scope.previousIndex = data.slider.previousIndex;
    });

});