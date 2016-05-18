angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicModal) {
  
  $scope.addNewComic = addNewComic;
  $scope.closeModal = closeModal;
  $scope.saveComic = saveComic;
  $scope.comic = {};
  $scope.modal = null;

  $ionicModal.fromTemplateUrl("templates/comic-modal.html", {
    scope: $scope
  })
  .then(function(modal){
    $scope.modal = modal;
  });

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

  function addNewComic(){
    $scope.modal.show();
  }

  function closeModal(){
    $scope.modal.hide();
  }

  function saveComic(){
    $scope.comic.cover = "calvin.png";
    $scope.comics.push( $scope.comic );
    $scope.comic = {};
    $scope.modal.hide();
  }

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
