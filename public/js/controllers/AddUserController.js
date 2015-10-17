/**
 * New node file
 */
'use strict';
myFacebook.controller('AddUserController',function($scope,$rootScope,dataService,$location,$window){

	$scope.addUser=function(){
		if($scope.signUpForm.fName.$invalid || $scope.signUpForm.lName.$invalid ||
				$scope.signUpForm.userName.$invalid || $scope.signUpForm.reuserName.$invalid ||
				$scope.signUpForm.pwd.$invalid || $scope.signUpForm.month.$invalid || $scope.signUpForm.day.$invalid ||
				$scope.signUpForm.year.$invalid || $scope.signUpForm.gender.$invalid){
			$scope.reqdError=true;
		}else{
			var emailPattern=/.+@.+\..+/i;
			if(!(($scope.userName).match(emailPattern))){
				$scope.usernameInvalid=true;
			}else if((!(($scope.userName).localeCompare($scope.reuserName))== 0)){
				$scope.emailNoMatch=true;
			}else{

				var dob = $scope.month+'/'+$scope.day+'/'+$scope.year;
				console.log(dob);
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
						if(err.status === 500){
							console.log("Error : " + err.message);
							$scope.alreadyExists=true;
						}
					}else{
						console.log(res);
						$rootScope.userFName = $scope.fName;
						$rootScope.userLName = $scope.lName;
						$rootScope.userGender = $scope.gender;
						$rootScope.userDob = dob;
						$rootScope.userName = $scope.userName;
						$window.localStorage.userName=$scope.userName;
						$rootScope.userFName=$scope.fName;
						$location.path('/home');
					}
				});
			}

		}
	}

	/*	$scope.closeError=function(){
		$scope.fName="";
		$scope.lName="";
		$scope.userName="";
		$scope.reuserName="";
		$scope.pwd="";
		$scope.month="";
		$scope.day="";
		$scope.year="";
		$scope.gender="";
	};*/
});