CTRLS.controller('ChatsCtrl', function($scope, UserService) {
  
  $scope.users = [];

  UserService.getAllUsers()
  .then(function(response){
    $scope.users = response.data.results;
  });
});