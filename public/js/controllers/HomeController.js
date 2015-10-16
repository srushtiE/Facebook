/**
 * New node file
 */
myFacebook.controller('HomeController',function($scope,$rootScope,dataService,$location,$window){


	$scope.initFunction = function(){
		$rootScope.userName = $window.localStorage.userName;
		$rootScope.userFName = $window.localStorage.userFName;
		$scope.templateView = {
				template : 'templates/profile.html'
		};
		$scope.searchUserNames();
		getFriendsList();
	};

	$scope.getUserPage=function(){
		console.log("in get User Page function");
		$scope.templateView.template='templates/user.html';
	};

	$scope.getHomePage= function(){
		console.log("in get home page function");
		$scope.templateView.template='templates/profile.html';
	};

	$scope.getFriendsPage=function(){
		console.log("in get friends page function");
		$scope.templateView.template='templates/friends.html';
	};

	$scope.searchUserNames = function(){
		$scope.searchInputs={
				items : []
		};
		dataService.getData('getAll',function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log(res.data);
				for(var i=0;i<res.data.length;i++){
					$scope.searchInputs.items[i] = res.data[i].item;
				}
			}
		});
	};

	$scope.showSearchResult=function(){
		var emailPattern=/.+@.+\..+/i;
		if(($scope.selectedInput).match(emailPattern)){
			$window.localStorage.searchedUserName=$scope.selectedInput; 
			$scope.templateView.template='templates/userProfile.html';
		}else{
			$window.localStorage.groupName=$scope.selectedInput;
			$scope.templateView.template='templates/groups.html';
		}
	};

	function getFriendsList(){
		$scope.friendsFName = [];
		$scope.friendsLName = [];
		$scope.friends=[];
		var fullName = "";
		var url = 'getFriendList/'+ $rootScope.userName;
		dataService.getData(url,function(err,res){
			console.log("inside HomeCtrl dataservice friends list");
			if(err){
				console.log(err);
			}else{
				console.log(res.data.length);
				console.log(res);
				for(var i=0;i<res.data.length;i++){
					$scope.friendsFName = res.data[i].fname;
					$scope.friendsLName = res.data[i].lname;
					console.log("$scope.friendsFName for res.data.fname : "+ res.data[i].fname);
					console.log("$scope.friendsLName for res.data.lname : "+ res.data[i].lname);
					fullName = res.data[i].fname+" "+res.data[i].lname;
					console.log("full name:"+ fullName);
					$scope.friends[i] = fullName;
				}
			}
		});
	}

	$scope.createNewGroup=function(){
		var newGroupDetails={
				userName : $rootScope.userName,
				groupName : $scope.newgroupName
		};

		dataService.postData('addGroup',newGroupDetails,function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log(res.data);
				$rootScope.newMember = $scope.newMemberName;
				var addNewMemberDetail = {
						groupName : $scope.newgroupName,
						userName : $scope.newMemberName
				};
				dataService.postData('addMember',addNewMemberDetail,function(err,res){
					if(err){
						console.log(err);
					}else{
						$scope.newMemberName = "";
						$scope.newgroupName = "";
						$scope.getHomePage();
					}
				});
			}
		});
	};

	$scope.logOutUser=function(){
		var userDetails = {
				userName : $rootScope.userName
		};
		dataService.postData('logOut',userDetails,function(err,res){
			console.log("inside HomeCtrl dataservice log out");
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
				/*$rootScope.userFName = res.data.firstname;
					$rootScope.userLName = res.data.lastname;
					$rootScope.userGender = res.data.gender;
					$rootScope.userDob = res.data.dob;
					$rootScope.userName = res.data.emailid;*/
				$location.path('/logout');
			}
		});
	};


});