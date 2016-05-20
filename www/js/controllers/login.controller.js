CTRLS.controller('LoginCtrl', function($scope, $state){
	
	$scope.data = {};
	$scope.doLogin = doLogin;

	function doLogin(){
		if($scope.data.username == "nicobytes" && $scope.data.password == "123"){
			$state.go('tab.chats');
		}
	}
});