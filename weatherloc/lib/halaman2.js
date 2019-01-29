$(document).ready(()=>{
	//hiding all animated elements
	$("div[id='TableDetails']").slideUp(0)
	$("nav").slideUp(0)
	$("#title").slideUp(0)
	$("body").fadeOut(0)
	$(".card").slideUp(0)
	$("#weatherDetail").slideUp(0)
	$("a[href='#!details']").slideUp(0)
	//showing
	$("body").fadeIn(1000)
	$("nav").slideDown(500)
	$("#title").delay(900).toggle(500)
	
 	$(".card").each(function(index) {
  		$(this).delay(1500+index*250).slideDown(500)
	});
	$("div[id='TableDetails']").each(function( index ) {
  		$(this).delay(2000+index*250).slideDown(500)
	});
	$("a[href='#!details']").delay(3000).slideDown(500)
	
	$(".navbar-toggler").click(function(){
		$(this).rotate({
		duration: 500,
		angle: 0,
		animateTo:180
		})
	})
	
	if(getCookie('keyAccess') == ""){
		alert("You are not logged in, please login again")
		$("body").fadeOut(2000,()=>{
			window.location.href="hal1.html"
		})
	}
	
	setInterval(checkLoginSession,120000)
})

function checkLoginSession(){
		if(getCookie('keyAccess') == ""){
			alert("Weather needs to be updated, please login again")
			localStorage.clear();
			$("body").fadeOut(2000,()=>{
				window.location.href="hal1.html"
			})
		}
	}
	
	
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
    	if (c.indexOf(name) == 0) {
      		return c.substring(name.length, c.length);
    	}
  	}
  return "";
}


function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	// add a zero in front of numbers<10
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	$('#time').text(today.toDateString() + ", " +h + ":" + m + ":" + s);
	t = setTimeout(function() {
    	startTime()
    }, 1000);
}

startTime(); 

var app = angular.module("app", ["ngRoute"]); 
	
app.controller('DashboardController',($scope,$timeout)=>{
	$scope.WeatherData=JSON.parse(localStorage.getItem('weatherList'))
	$scope.showWeatherData=(index)=>{
		$scope.oneCity=JSON.parse(localStorage.getItem('weatherList'))[index]
		console.log($scope.oneCity.name)
		$('a[href="#!aboutme"]').slideUp(750)
  		$(".card").slideUp(750)
		$("#mainBox").slideUp(1000)
		$("#weatherDetail").slideDown(1500)
	}
	$scope.hideWeatherData=()=>{
		$('a[href="#!aboutme"]').slideDown(750)
		$("#weatherDetail").slideUp(1500)
		$("#mainBox").slideDown(1000)
		
		$(".card").each(function(index) {
  			$(this).delay(1000+index*250).slideDown(750)
		});
	}
	$scope.showAboutMe=()=>{
  		$(".card").slideUp(750)
		$("#mainBox").slideUp(1000)
		$("#weatherDetail").slideDown(1500)
	}
	$scope.hideAboutMe=()=>{
		$("#weatherDetail").slideUp(1500)
		$("#mainBox").slideDown(1000)
		
		$(".card").each(function(index) {
  			$(this).delay(1000+index*250).slideDown(750)
		});
	}
	$scope.logout=()=>{
		let res = document.cookie;
   	 	let multiple = res.split(";");
    	for(let i = 0; i < multiple.length; i++) {
    		let key = multiple[i].split("=");
       	 	document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    	}
    	localStorage.clear();
		$("body").fadeOut(2000,()=>{
			window.location.href="hal1.html"
		})
	}
})

app.config(function($routeProvider){
	$routeProvider
	.when('/details',{templateUrl:"hal3.html"})
	.when('/aboutme',{templateUrl:"hal4.html"})
});

