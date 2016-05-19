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

.factory('ComicService', function( $cordovaSQLite, $q ){
  return {
    createComic: function(title, author, cover, year){
      var query = "INSERT INTO comics(title, author, cover, year) VALUES (?,?,?,?)";
      var attrs = [title, author, cover, year];
      $cordovaSQLite.execute(DB, query, attrs)
      .then(function( response ){
        console.log( response );
      })
      .catch(function( error ){
        console.log( error );
      });
    },
    getAllComics: function(){
      var comics = [];
      var query = "SELECT * FROM comics";
      return $cordovaSQLite.execute(DB, query)
      .then(function( response ){
        console.log( response );
        for (var i = 0; i < response.rows.length; i++) {
          comics.push({
            id: response.rows.item(i).id,
            title: response.rows.item(i).title,
            author: response.rows.item(i).author,
            cover: response.rows.item(i).cover,
            year: response.rows.item(i).year
          });
        };
        return $q.when( comics );
      })
      .catch(function( error ){
        return $q.reject( error );
      });
    }
  }
})