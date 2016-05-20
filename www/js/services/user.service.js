SERVICES.factory('UserService', function( $http ){
  return {
    getAllUsers: function(){
      return $http.get('https://randomuser.me/api/?results=50&gender=male');
    },
    createUser: function( data ){
      //return $http.post('sdsdsd', data);
    }
  };
});