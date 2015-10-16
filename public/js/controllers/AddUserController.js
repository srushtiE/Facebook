/**
 * New node file
 */
'use strict';
myFacebook.controller('AddUserController',function($scope,$rootScope,dataService,$location){
	
	$scope.addUser=function(){
		var dob = $scope.month+'/'+$scope.day+'/'+$scope.year;
		console.log(dob);
		if($scope.userName != $scope.reuserName){
			$scope.isSame = true;
			return false;
		}else{
			$scope.isSame = false;
		}
		var userDetails = {
				fName : $scope.fName,
				lName : $scope.lName,
				gender : $scope.gender,
				dob : dob,
				userName : $scope.userName,
				password : $scope.pwd
		};
		
		console.log(userDetails);
		
		dataService.postData('signUp',userDetails,function(err,res){
			console.log("inside AddUserController dataservice");
			if(err){
				console.log("Error")
			}else{
				console.log(res);
				$rootScope.userFName = $scope.fName;
				$rootScope.userLName = $scope.lName;
				$rootScope.userGender = $scope.gender;
				$rootScope.userDob = dob;
				$rootScope.userName = $scope.userName;
				$location.path('/home');
			}
		});
		
	}
});