/**
 * New node file
 */
'use strict';
myFacebook.controller('GetUserController',function($scope,$rootScope,dataService,$location,$window){
	$scope.getUser=function(){
		console.log("in controller");
		var userDetails = {
				userName : $scope.uName,
				password : $scope.pswd
		};
		dataService.postData('logIn',userDetails,function(err,res){
			console.log("inside GetUserController dataservice");
			if(err){
				console.log(err);
				if(err.status === 500){
					console.log("Error" + err);
				}else{
					if(err.status === 403){
						console.log("Error" + err);
						$scope.invalidError=true;
						//$location.path('/invalid');
					}
				}
			}else{
				console.log("inside else of GetUserController dataservice");
				console.log(res);
				$rootScope.userName = $scope.uName;
				$rootScope.userFName = res.data.fname;
				$window.localStorage.userFName = res.data.fname;
				$window.localStorage.userName = $scope.uName;
				/*$rootScope.userFName = res.data.firstname;
					$rootScope.userLName = res.data.lastname;
					$rootScope.userGender = res.data.gender;
					$rootScope.userDob = res.data.dob;
					$rootScope.userName = res.data.emailid;*/
				$location.path('/home');
			}
		});
	};
	
	$scope.closeError=function(){
		$scope.uName="";
		$scope.pswd="";
	};
	/*$scope.logOutUser=function(){
		var userDetails = {
				userName : $scope.uName
		};
		dataService.postData('logOut',userDetails,function(err,res){
			console.log("inside GetUserController dataservice log out");
			if(err){
				console.log(err);
				if(err.status === 500){
					console.log("Error" + err);
				}else{
					if(err.status === 403){
						console.log("Error" + err);
						$location.path('/home');
					}
				}
			}else{
				console.log(res.data);
				$location.path('/logout');
			}
		});
	};*/
});