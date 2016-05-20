CTRLS.controller('DashCtrl', function($scope, $ionicModal, $ionicActionSheet, $ionicPopup, $ionicPopover, ComicService, $cordovaCamera, $cordovaVibration, $cordovaDeviceMotion, $cordovaGeolocation) {
  
  $scope.addNewComic = addNewComic;
  $scope.closeModal = closeModal;
  $scope.saveComic = saveComic;
  $scope.deleteComic = deleteComic;
  $scope.showOptions = showOptions;
  $scope.editComic = editComic;
  $scope.showPopover = showPopover;
  $scope.choosePicture = choosePicture;
  $scope.takePicture = takePicture;
  $scope.listerXYZ = listerXYZ;
  $scope.getPosition = getPosition;
  $scope.isNew = true;
  $scope.comic = {};
  $scope.modal = null;
  $scope.popover = null;
  $scope.comics = [];

  /*
  ComicService.getAllComics()
  .then(function(comics){
    console.log( comics );
    if(comics != undefined) $scope.comics = comics; 
  })
  .catch(function( error ){
    console.log( error );
  });
  */

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
      ComicService.createComic($scope.comic.title, $scope.comic.author, $scope.comic.cover, $scope.comic.year);
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

    $cordovaVibration.vibrate(200);

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

  function choosePicture(){

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture( options )
    .then(function( imageData ){
      $scope.comic.cover = "data:image/jpeg;base64," + imageData;
    });
  }

  function takePicture(){

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture( options )
    .then(function( imageData ){
      $scope.comic.cover = "data:image/jpeg;base64," + imageData;
    });
  }

  function listerXYZ(){
    var options = {
      frequency: 1000
    };
    var watch = $cordovaDeviceMotion.watchAcceleration();
    
    watch.then(
      null,
      function(error){
        console.log(error);
      },
      function( result ){
        var X = result.x;
        var Y = result.y;
        var Z = result.z;
        console.log(X, Y, Z);
      }
    );
  }

  function getPosition(){

    var options = {
      timeout: 30000,
      enableHighAccuracy: false,
      maximumAge: 10000
    };


    $cordovaGeolocation.getCurrentPosition( options )
    .then(function( position ){
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      console.log( lat, long );
      console.log( new Date(position.timestamp) );
    });
  }

});
