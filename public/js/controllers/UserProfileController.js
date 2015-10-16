/**
 * New node file
 */
myFacebook.controller('UserProfileController',function($scope,$rootScope,dataService,$location,$window){

	$scope.initFunction = function(){
		$scope.searchedUserName=$window.localStorage.searchedUserName;
		$scope.overview = ["Overview","Work and Education","Places You've Lived","Contact and Basic Info","Life Events"];
		getFriendsList();
		$scope.getOverviewDetails("Overview");
		$scope.tabActive('about');
		dataService.getData('checkFriendRequest/'+$rootScope.userName+'/'+$scope.searchedUserName,function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log(res.data);
				if(!res.data)
					$scope.isFriend="no";
				else if(res.data.userid==$rootScope.userName && res.data.status==1)
					$scope.isFriend="pendingByUser";
				else if(res.data.userid==$scope.searchedUserName && res.data.status==1)
					$scope.isFriend="pending";
				else if(res.data.status==2)
					$scope.isFriend="yes";
				
				console.log($scope.isFriend);
			}
		});
	};
	
	$scope.sendFriendRequest=function(){
		var requestDetails={
				userName : $rootScope.userName,
				toUser : $scope.searchedUserName
		};
		dataService.postData('addFriend',requestDetails,function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log(res.data);
				$scope.isFriend="pendingByUser";
			}
		});
	};
	
	$scope.acceptFriendRequest=function(){
		var requestDetails={
				withUser : $scope.searchedUserName,
				userName : $rootScope.userName
		};
		dataService.postData('confirmFriend',requestDetails,function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log(res.data);
				$scope.isFriend="yes";
				getFriendsList();
			}
		});
	};

	function getFriendsList(){
		$scope.friendsFName = [];
		$scope.friendsLName = [];
		$scope.friendsUserSearch=[];
		var fullName = "";
		var url = 'getFriendList/'+ $scope.searchedUserName;
		dataService.getData(url,function(err,res){
			console.log("inside HomeCtrl dataservice friends list");
			if(err){
				console.log(err);
			}else{
				/*console.log(res.data.length);*/
				console.log("Get searched user friend list");
				console.log(res);
				for(var i=0;i<res.data.length;i++){
					$scope.friendsFName = res.data[i].fname;
					$scope.friendsLName = res.data[i].lname;
					console.log("$scope.friendsFName for res.data.fname : "+ res.data[i].fname);
					console.log("$scope.friendsLName for res.data.lname : "+ res.data[i].lname);
					fullName = res.data[i].fname+" "+res.data[i].lname;
					console.log("full name:"+ fullName);
					$scope.friendsUserSearch[i] = fullName;
				}
			}
		});
	}

	$scope.getOverviewDetails=function(ov){
		$scope.overviewDetails =[];
		$rootScope.ovid='0';
		//var ovid=['1','2','3','4'];
		if(((ov).localeCompare("Overview"))==0){
			var url = 'showOverview/'+$scope.searchedUserName;
			dataService.getData(url,function(err,res){
				if(err){
					console.log(err);
				}else{
					for(var i=0;i<res.data.length;i++){
						$scope.overviewDetails[i] = res.data[i].info;
						$rootScope.ovid = res.data[i].ovid;
					}
				}
			});
		}else{
			switch(ov){
			case "Work and Education" : 
				var url ='showOverviewDetails/'+$scope.searchedUserName+'/1';
				dataService.getData(url,function(err,res){
					if(err){
						console.log(err);
					}else{
						for(var i=0;i<res.data.length;i++){
							$scope.overviewDetails[i] = res.data[i].info;
							$rootScope.ovid = res.data[i].ovid;
						}
					}
				});
				break;
			case "Places You've Lived" :
				var url ='showOverviewDetails/'+$scope.searchedUserName+'/2';
				dataService.getData(url,function(err,res){
					if(err){
						console.log(err);
					}else{
						for(var i=0;i<res.data.length;i++){
							$scope.overviewDetails[i] = res.data[i].info;
							$rootScope.ovid = res.data[i].ovid;
						}
					}
				});
				break;
			case "Contact and Basic Info" :
				var url ='showOverviewDetails/'+$scope.searchedUserName+'/3';
				dataService.getData(url,function(err,res){
					if(err){
						console.log(err);
					}else{
						for(var i=0;i<res.data.length;i++){
							$scope.overviewDetails[i] = res.data[i].info;
							$rootScope.ovid = res.data[i].ovid;
						}
					}
				});
				break;
			case "Life Events" :
				var url ='showOverviewDetails/'+$scope.searchedUserName+'/4';
				dataService.getData(url,function(err,res){
					if(err){
						console.log(err);
					}else{
						for(var i=0;i<res.data.length;i++){
							$scope.overviewDetails[i] = res.data[i].info;
							$rootScope.ovid = res.data[i].ovid;
						}
					}
				});
				break;
			}

		}
	};

	$scope.tabActive=function(tabName){
		switch(tabName){
		case 'about' : 
			$scope.about = true;
			$scope.frnd = false;
			$scope.interests = false;
			break;
		case 'friends' :
			$scope.frnd = true;
			$scope.about = false;
			$scope.interests = false;
			break;
		case 'interests' :
			$scope.interests = true;
			$scope.frnd = false;
			$scope.about = false;
			break;
		}
	};
});