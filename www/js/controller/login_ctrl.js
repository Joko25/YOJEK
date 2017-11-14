app.controller('loginCtrl', function($scope, $state, $http, $ionicPopup, $ionicLoading, $window, $ionicLoading, UserService) {
  $scope.data = {};
  $scope.face = 'img/icon.png';

  var log = $window.localStorage.getItem("log");

  if(log == "true"){
    $state.go("app.dash");
  }
 
  $scope.login = function() {

    $ionicLoading.show({
      template: '<ion-spinner icon="dots"></ion-spinner>'
      //duration: 1000
    }).then(function(){
       //console.log("The loading indicator is now displayed");
    });



    var userLog = $window.localStorage.getItem("username");
    var passLog = $window.localStorage.getItem("password");
    console.log("LOGIN user: " + userLog + " - PW: " + passLog);
    if ($scope.data.username == userLog && $scope.data.password == passLog && $scope.data.username !=='' && $scope.data.password !=='') {
      $ionicLoading.hide();
      $state.go("app.dash");
      $window.localStorage.setItem("log", "true");
    }else{
      var alertPopup = $ionicPopup.alert({
          title: 'Login error!',
          template: "Username or password is wrong"
      });
      $ionicLoading.hide();
    }
    // $state.go("reg");
  }

  $scope.regist = function(){
    console.log("registrasi");
    $state.go("reg");
  };

  $scope.forget = function(){
    console.log("forget");
  };

  $scope.googleSignIn = function() {
    $ionicLoading.show({
      template: 'Logging in...'
    });

    window.plugins.googleplus.login(
      {},
      function (user_data) {
        // For the purpose of this example I will store user data on local storage
        UserService.setUser({
          userID: user_data.userId,
          name: user_data.displayName,
          email: user_data.email,
          picture: user_data.imageUrl,
          accessToken: user_data.accessToken,
          idToken: user_data.idToken
        });

        $ionicLoading.hide();
        $state.go('app.dash');
      },
      function (msg) {
        $ionicLoading.hide();
      }
    );
  };
});


app.controller('RegCtrl', function($scope, $ionicHistory, $window, $ionicPopup, $state, $http, $ionicLoading) {
  $scope.goBack = function(){
    // $ionicHistory.goBack();
    $state.go("login");
  }

  $scope.data = {};

  $scope.regist = function(){
    var email = $scope.data.email;
    var username = $scope.data.username;
    var user = $scope.data.name;
    var pass = $scope.data.password;

    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
      //duration: 1000
    }).then(function(){
       //console.log("The loading indicator is now displayed");
    });

    //console.log(email); email == undefined || user ==undefined || pass == undefined || username ==undefined

    if (email=='') {
      var alertPopup = $ionicPopup.alert({
          title: 'Register failed!',
          template: "Harap terisi semua format email harus benar"
      });
      $ionicLoading.hide();
    }else{
      // $url = "http://localhost:8080/sinauserv/class/model/user.create.php";
      
      // $http.post($url, {
      //   email : email,
      //   username : username,
      //   user : user,
      //   pass : pass
      // }).then(function(res){
      //   var result = res;
      //   console.log(String(result.data)+" "+"\"success\"");

      //   $ionicLoading.hide();
      //   if (String(result.data)==="success") {
      //       var alertPopup = $ionicPopup.alert({
      //           title: 'Register Success!',
      //           template: "login dengan username : "+result.data
      //       });            
      //   }else{
      //       var alertPopup = $ionicPopup.alert({
      //           title: 'Login failed!',
      //           template: "Faild"
      //       });
      //       $scope.data.email = '';
      //       $scope.data.username = '';
      //       $scope.data.name = '';
      //       $scope.data.password = '';
      //   }

      //   //$state.go("login");
      // });

      $window.localStorage.setItem("email", email);
      $window.localStorage.setItem("username", username);
      $window.localStorage.setItem("password", pass);
      $ionicLoading.hide();
      $state.go("login");

    }
  }
})