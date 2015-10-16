/**
 * New node file
 */
myFacebook.controller('GroupController',function($scope,$rootScope,dataService,$location,$window){

	$scope.initFunction = function(){
		$rootScope.userName = $window.localStorage.userName;
		$scope.groupName = $window.localStorage.groupName;
		getGroupInfo($scope);
		getGroupAdmin($scope);
		getPendingRequests($scope);
	};

	function getGroupAdmin($scope){
		var userName = $rootScope.userName;
		var groupName = $scope.groupName;
		$scope.isAdmin=false;

		var url = "getGroupAdmin/"+groupName;
		dataService.getData(url,function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log(res.data[0].createdby);
				$scope.groupAdmin = res.data[0].createdby;
				if((($scope.groupAdmin).localeCompare(userName))==0){
					$scope.isAdmin = true;
				}
			}
		});
	}

	function getGroupInfo($scope){
		var groupName = $scope.groupName;
		var userName = $rootScope.userName;
		$scope.isMember=true;
		console.log("groupName in getgroupinfo: "+groupName);
		$scope.members=[];
		var url = "showMembers/"+ groupName;
		dataService.getData(url,function(err,res){
			console.log("inside get service call get group info");
			if(err){
				console.log(err);
			}else{
				console.log(res.data);
				for(var i=0;i<res.data.length;i++){
					$scope.members[i] = res.data[i].userid;
					if((($scope.members[i]).localeCompare(userName))==0){
						$scope.isMember=false;
					}
				}
			}
		});
	}

	function getPendingRequests($scope){
		$scope.pendingRequests=[];
		var groupName = $scope.groupName;
		var url = "getPendingRequests/"+groupName;
		dataService.getData(url,function(err,res){
			console.log("in dataService.getData");
			if(err){
				console.log(err);
				console.log("in err of dataService.getData");
			}else{
				console.log("dataService.getData response " +res.data);
				for(var i=0;i<res.data.length;i++){
					$scope.pendingRequests[i] = res.data[i].member_requesting;
				}
			}
		});
	}

	$scope.deleteGroup = function(){
		var details = {
			groupName: $scope.groupName
		};

		dataService.postData('deleteGroup',details,function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log("Group Deleted");
				$scope.templateView.template='templates/profile.html';
			}
		});
	};

	$scope.deleteMember = function(memberName){
		var memberDetails = {
				groupName : $scope.groupName,
				userName : memberName
		};
		dataService.postData('deleteMember',memberDetails,function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log(res.data);
				$scope.initFunction();
			}
		});
	};

	$scope.addMember = function(){
		var details={
				groupName: $scope.groupName,
				userName: $rootScope.userName
		};

		dataService.postData('addMember',details,function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log(res.data);
				$scope.initFunction();
			}
		});
	};

	$scope.confirmMember = function(memberName){
		var details = {
				groupName: $scope.groupName,
				userName: memberName
		};
		dataService.postData('confirmMember',details,function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log(res.data);
				$scope.initFunction();
			}
		});

	};
});