/**
 * New node file
 */
myFacebook.controller('FriendController',function($scope,$rootScope,dataService,$location,$window){

	$scope.initFunction = function(){
		$rootScope.userName = $window.localStorage.userName;
		getFriendsList();
		getPendingFriendsList();
	};

	$scope.addFriend=function(pfName){
		var pfdetails={
				userName : $rootScope.userName,
				withUser : pfName				
		};

		dataService.postData('confirmFriend',pfdetails,function(err,res){
			if(err){
				console.log(err);
			}else{
				$scope.initFunction();
			}
		});
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

	function getPendingFriendsList(){
		console.log("in getPendingFriendsList");
		$scope.pendingFriends=[];
		var url = 'getPendingFriendsList/'+ $rootScope.userName;
		dataService.getData(url,function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log("list pending reqs :" + res.data);
				$scope.pendingFriends = res.data;
			}
		});
	}
});