/**
 * New node file
 */

myFacebook.controller('ProfileController',function($scope,$rootScope,dataService,$location,$window){
	$scope.initFunction = function(){
		$rootScope.userName = $window.localStorage.userName;
		getGroupsList();
		getPosts();
		$scope.newPost="";
	};

	function getGroupsList (){
		var url = 'showGroupList/'+$rootScope.userName;
		$scope.groups=[];
		dataService.getData(url,function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log(res.data);
				for(var i=0;i<res.data.length;i++){
					$scope.groups[i] = res.data[i].groupname; 
				}
			}
		});
	}

	$scope.getTemplate=function(groupName){
		console.log("groupName in get Template "+ groupName);
		$window.localStorage.groupName = groupName;
		$rootScope.groupName = groupName;
		$scope.templateView.template='templates/groups.html';
	};

	$scope.postNew=function(){
		if($scope.newPost){
			console.log("in postnew function");
			var feedDetails={
					userName: $rootScope.userName,
					newsFeed: $scope.newPost
			};
			dataService.postData('postNewsFeeds',feedDetails,function(err,res){
				if(err){
					console.log(err);
				}else{
					console.log(res.data);
					$scope.initFunction();
				}
			});
		}
	};

	function getPosts(){
		var url ="getNewsFeeds/"+$rootScope.userName;
		$scope.newfeedDetails=[];
		dataService.getData(url,function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log(res.data);
				console.log(res.data.length);
				$scope.newfeedDetails = res.data;
			}
		});
	}

});