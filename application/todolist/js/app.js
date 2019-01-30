$('document').ready(()=>{

})
	
var app = angular.module("sss", []); 

app.controller('DashboardController',($scope,$timeout)=>{
	$scope.task=[]
	if(localStorage.getItem("todos") != null) $scope.task=JSON.parse(localStorage.getItem("todos"))
	$scope.createNewTask=function(){
		if(angular.element('#data').val() == "") return
		$scope.task.push(angular.element('#data').val())
		localStorage.setItem("todos",JSON.stringify($scope.task))
		angular.element('#data').val("")
	}
	$scope.markThisDone=function(marker){
        $scope.task.splice(marker,1)
		localStorage.setItem("todos",JSON.stringify($scope.task))
	}
})