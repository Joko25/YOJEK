app.controller('dashCtrl', function($scope, $state, $cordovaGeolocation) {
  $scope.yoRide  = function(){
    $state.go("yoride");
  }
  $scope.yoFood  = function(){
    $state.go("app.yofood");
  }
	$scope.options = {
      loop: false,
      effect: 'fade',
      speed: 500,
      autoplay:3500
  };
  
  $scope.slide = [{
    background: 'light-bg',
    title: 'Selamat datang di YOJEK',
    desc: 'Terimakasih telah menggunakan layanan kami.',
    face: '#'
  },{
    background: 'energized-bg',
    title: 'Promo hari ini',
    desc: 'dapatkan 100poin setiap 1 kali menggunakan layanan Yojek',
    face: 'img/lg2.png'
  },{
    background: 'light-bg',
    title: 'Layanan kami',
    desc: 'Description',
    face: 'img/lg.png'
  }];


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