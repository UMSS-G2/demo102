angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicModal, $ionicActionSheet, $ionicPopup, $ionicPopover, ComicService) {
  
  $scope.addNewComic = addNewComic;
  $scope.closeModal = closeModal;
  $scope.saveComic = saveComic;
  $scope.deleteComic = deleteComic;
  $scope.showOptions = showOptions;
  $scope.editComic = editComic;
  $scope.showPopover = showPopover;
  $scope.isNew = true;
  $scope.comic = {};
  $scope.modal = null;
  $scope.popover = null;

  $ionicModal.fromTemplateUrl("templates/comic-modal.html", {
    scope: $scope
  })
  .then(function(modal){
    $scope.modal = modal;
  });

  $ionicPopover.fromTemplateUrl("templates/options-popover.html", {
    scope: $scope
  })
  .then(function(popover){
    $scope.popover = popover;
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
    $scope.isNew = true;
    $scope.comic = {};
    $scope.popover.hide();
    $scope.modal.show();
  }

  function closeModal(){
    $scope.modal.hide();
  }

  function saveComic(){
    if($scope.isNew){
      $scope.comic.cover = "calvin.png";
      $scope.comics.push( $scope.comic );
      $scope.comic = {};
    }
    $scope.modal.hide();
  }

  function deleteComic( indexComic ){
    $ionicPopup.confirm({
      title: "Is sure?",
      okText: "Yes!!!!",
      template: "This is important",
      cancelText: "Sorry!!"
    })
    .then(function(rta){
      if(rta) $scope.comics.splice( indexComic, 1 );
    });
  }

  function showOptions( indexComic ){
    $ionicActionSheet.show({
      buttons: [
        { text: "<i class='icon ion-share'></i>Share" },
        { text: "<i class='icon ion-edit'></i>Edit" },
      ],
      destructiveText: "<i class='icon ion-trash-b'></i>Delete",
      destructiveButtonClicked: function(){
        $scope.deleteComic( indexComic );
        return true;
      },
      cancelText: "Close",
      buttonClicked: function( indexButton ){
        if(indexButton == 1){
          $scope.editComic( indexComic );
        }
        return true;
      }
    });
  }

  function editComic( indexComic ){
    $scope.isNew = false;
    $scope.comic = $scope.comics[indexComic];
    $scope.modal.show();  
  }

  function showPopover($event){
    $scope.popover.show($event);
  }

})

.controller('ChatsCtrl', function($scope, UserService) {
  
  $scope.users = [];

  UserService.getAllUsers()
  .then(function(response){
    $scope.users = response.data.results;
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
