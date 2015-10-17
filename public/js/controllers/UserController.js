/**
 * New node file
 */
myFacebook.controller('UserController',function($scope,$rootScope,dataService,$location,$window){

	$scope.initFunction = function(){
		$rootScope.userName = $window.localStorage.userName;
		$rootScope.userFName = $window.localStorage.userFName;
		$scope.overview = ["Overview","Work and Education","Places You've Lived","Contact and Basic Info","Life Events"];
		$scope.templateView = {
				template : 'templates/user.html'
		};
		getFriendsList();
		getPendingFriendsList();
		$scope.getOverviewDetails("Overview");
		$scope.interest = ["Music","Shows","Sports"];
		$scope.tabActive('about');
		$scope.ovid = '0';
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

	$scope.getOverviewDetails=function(ov){
		$scope.overviewDetails =[];
		$scope.ovid='0';
		$scope.ov = ov;
		//var ovid=['1','2','3','4'];
		if(((ov).localeCompare("Overview"))==0){
			var url = 'showOverview/'+$rootScope.userName;
			dataService.getData(url,function(err,res){
				if(err){
					console.log(err);
				}else{
					if(res.data.length==0){
						$scope.noverview=true;
					}
					$scope.overviewDetails = res.data;
					/*for(var i=0;i<res.data.length;i++){
						$scope.overviewDetails[i] = res.data[i].info;
						$scope.ovid = res.data[i].ovid;
					}*/
				}
			});
		}else{
			switch(ov){
			case "Work and Education" : 
				var url ='showOverviewDetails/'+$rootScope.userName+'/1';
				dataService.getData(url,function(err,res){
					if(err){
						console.log(err);
					}else{
						$scope.overviewDetails = res.data;
						$scope.ovid = '1';
						/*for(var i=0;i<res.data.length;i++){
							$scope.overviewDetails[i] = res.data[i].info;
							$scope.ovid = res.data[i].ovid;
						}*/
					}
				});
				break;
			case "Places You've Lived" :
				var url ='showOverviewDetails/'+$rootScope.userName+'/2';
				dataService.getData(url,function(err,res){
					if(err){
						console.log(err);
					}else{
						$scope.overviewDetails = res.data;
						$scope.ovid = '2';
						/*for(var i=0;i<res.data.length;i++){
							$scope.overviewDetails[i] = res.data[i].info;
							$scope.ovid = res.data[i].ovid;
							console.log($scope.ovid);*/
						//}
					}
				});
				break;
			case "Contact and Basic Info" :
				var url ='showOverviewDetails/'+$rootScope.userName+'/3';
				dataService.getData(url,function(err,res){
					if(err){
						console.log(err);
					}else{
						$scope.overviewDetails = res.data;
						$scope.ovid = '3';
						/*for(var i=0;i<res.data.length;i++){
							$scope.overviewDetails[i] = res.data[i].info;
							$scope.ovid = res.data[i].ovid;
						}*/
					}
				});
				break;
			case "Life Events" :
				var url ='showOverviewDetails/'+$rootScope.userName+'/4';
				dataService.getData(url,function(err,res){
					if(err){
						console.log(err);
					}else{
						$scope.overviewDetails = res.data;
						$scope.ovid = '4';
						/*for(var i=0;i<res.data.length;i++){
							$scope.overviewDetails[i] = res.data[i].info;
							$scope.ovid = res.data[i].ovid;
						}*/
					}
				});
				break;
			}
		}
	};

	$scope.changeModal = function(ovid){
		console.log("change modal = "+ovid);
		if(ovid)
			$scope.ovid = ovid;
	};

	$scope.addDetail=function(){
		$scope.addovModal=false;
		console.log("in add detail function");
		if($scope.newDetails){
			var ovdetails={
					ovid : $scope.ovid,
					userName : $rootScope.userName,
					info : $scope.newDetails
			};

			dataService.postData('addOverviewDetails',ovdetails,function(err,res){
				if(err){
					console.log(err);
				}else{
					console.log(res.data);
					$scope.newDetails="";
					$scope.getOverviewDetails('Overview');
				}
			});
		}else{
			$scope.addovModal=true;
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
			dataService.getData('getUserInterests/'+$rootScope.userName,function(err,res){
				if(err){
					console.log(err);
				}else{
					console.log(res);
					$scope.userMusicInterest = res.data.filter(function(obj){
						return obj.category=="Music";
					});
					$scope.userShowsInterest = res.data.filter(function(obj){
						return obj.category=="Shows";
					});
					$scope.userSportsInterest = res.data.filter(function(obj){
						return obj.category=="Sports";
					});
				}
			});
			$scope.frnd = false;
			$scope.about = false;
			break;
		}
	};

	$scope.addInterestsMusic=function(){
		$scope.addmuModal=false;
		if($scope.newNameMusic && $scope.newLabelMusic){
			var interestMusicDetails={
					category : 'Music',
					name : $scope.newNameMusic,
					label : $scope.newLabelMusic,
					userName : $rootScope.userName
			};

			dataService.postData('addUserInterests',interestMusicDetails,function(err,res){
				if(err){
					console.log(err);
				}else{
					console.log(res.data);
					$scope.tabActive('interests');
				}
			});
		}else{
			$scope.addmuModal=true;
		}
	};

	$scope.addInterestsShows=function(){
		$scope.addshModal=false;
		if($scope.newNameShows && $scope.newLabelShows){
			var interestShowsDetails={
					category : 'Shows',
					name : $scope.newNameShows,
					label : $scope.newLabelShows,
					userName : $rootScope.userName
			};

			dataService.postData('addUserInterests',interestShowsDetails,function(err,res){
				if(err){
					console.log(err);
				}else{
					console.log(res.data);
					$scope.tabActive('interests');
				}
			});
		}else{
			$scope.addshModal=true;
		}
	};


	$scope.addInterestsSports=function(){
		$scope.addspModal=false;
		if($scope.newNameSports && $scope.newLabelSports){
			var interestSportsDetails={
					category : 'Sports',
					name : $scope.newNameSports,
					label : $scope.newLabelSports,
					userName : $rootScope.userName
			};

			dataService.postData('addUserInterests',interestSportsDetails,function(err,res){
				if(err){
					console.log(err);
				}else{
					console.log(res.data);
					$scope.tabActive('interests');
				}
			});
		}else{
			$scope.addspModal=true;
		}
	};

	$scope.acceptFriendRequest=function(pfName){
		var requestDetails={
				withUser : pfName,
				userName : $rootScope.userName
		};
		dataService.postData('confirmFriend',requestDetails,function(err,res){
			if(err){
				console.log(err);
			}else{
				getFriendsList();
				getPendingFriendsList();
			}
		});
	};



});