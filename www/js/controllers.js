angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  

  $scope.comics = [
    {
      title: "Mafalda",
      author: "Quino",
      cover: "mafalda.jpg",
      year: 1990
    },
    {
      title: "Calvin and Hobbes",
      author: "dsfsdf sdfsdf",
      cover: "calvin.png",
      year:1990
    },
    {
      title: "Pentaus",
      author: "dsfdsf sdfsdaf",
      cover: "charlie.png",
      year: 1907
    }
  ];

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
