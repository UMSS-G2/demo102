angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('UserService', function( $http ){
  return {
    getAllUsers: function(){
      return $http.get('https://randomuser.me/api/?results=50&gender=male');
    },
    createUser: function( data ){
      //return $http.post('sdsdsd', data);
    }
  };
})

.factory('ComicService', function( $cordovaSQLite ){
  
  var DB = $cordovaSQLite.openDB({ name: "demo102.db" });

  function createTable(){
    var sql = "CREATE TABLE IF NOT EXISTS comics (id integer PRIMARY KEY AUTOINCREMENT, title text, author text, cover text, year integer)";
    $cordovaSQLite.execute(DB, sql)
    .then(function( res ){
      console.log( res );
    })
    .catch(function( error ){
      console.log( error );
    });
  }

  createTable();

  return {
    createComic: function(){

    }
  }
})