$(document).ready(()=>{
	$("body").css("display",'none')
	$("#LetsLogin").slideUp(0)
	$("body").fadeIn(3000)
	$("#LetsLogin").delay(2000).slideDown(1000)
	$(".progress").hide()
	$(".MouseHoverFadeAnimation").hover(function(){
    	$(this).animate({ opacity: "1.0" },250);
	}, function() {
    	$(this).animate({ opacity: "0.8"},250);
	});
	
	$("button[type='submit']").click( (e)=>{
		$("#LoginButtonArea").slideToggle("slow",'swing')
		$(".progress").slideToggle("slow",'swing')
	})
	
	if(getCookie('keyAccess') != ""){
			alert("Welcome Back!")
			$("body").fadeOut(2000,()=>{
				window.location.href="hal2.html"
			})
	}
})

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

var app = angular.module("app", []); 
app.controller('FrontController',($scope,$timeout,$http)=>{
	$scope.username="user"
	$scope.password="uaspti"
	$scope.Login=()=>{
		$("button[type='submit']").prop('disabled', true);
		$("div[role='progressbar'").html("<h5>Please Wait</h5>")
		$("#LetsLogin").slideUp(1000)
		$timeout($scope.checklogin, 1500);
	}
	$scope.checklogin=()=>{
		$http({
			method: 'GET',
			url: 'lib/credentials.js',
		}).then((response)=>{
			console.log(response.data)
			console.log($scope.username+' '+$scope.password)
			if($scope.username == undefined || $scope.password == undefined){
				$scope.loginError("Please make sure fields are filled properly")
			}
			else if(sha256.hmac($scope.username,$scope.password) != response.data.keyAccess){
				console.log("loginFail")
				$scope.loginError("Login Failed. No account is found")
			}else{	
				let d = new Date()
				d.setTime(d.getTime() + 300000)
				var expires="expires="+d.toUTCString()+";"
				document.cookie ="keyAccess="+response.data.keyAccess+";"+expires
				document.cookie ="API="+response.data.API+";"+expires
				document.cookie ="bbox="+response.data.bbox+";"+expires
				$("div[role='progressbar'").html("<h5>Almost There</h5>")
				$timeout($scope.pullJson, 1500);
			}
		}, (response)=>{
			$scope.loginError("Unstable Internet. Please Check Connection!")
		})
	}
	$scope.pullJson=()=>{
		let url="https://api.openweathermap.org/data/2.5/box/city?APPID="+getCookie("API")+"&"+getCookie("bbox")
		$http({
			method: 'GET',
			url,
		}).then((response)=>{
			let z=response.data.list;
			z=z.splice(8,3)
			//tambah gambar
			for(let x of z){
				console.log(x)
				x.picture="source/hal2/gambar/"+x.name+".jpg"	
			}
			
			localStorage.setItem("weatherList",JSON.stringify(z));
			$("div[role='progressbar'").html("<h5>Done.. we will take you there</h5>")
			$timeout($scope.redirect, 1500);
		}, (response)=>{
			$scope.loginError("Unstable Network. Please Try Again")
		})
	}
	$scope.redirect=()=>{
		$("body").animate({opacity: '0.0'}, "slow",()=>{
			window.location.href="hal2.html"
		});
	}
	$scope.togglePassword=()=>{
		let toggler=$('button[ng-click="togglePassword()"]').children()
		let passForm=$('#password')
		if(passForm.attr('type') == "password") passForm.attr('type','text')
		else passForm.attr('type','password')
		
		if(toggler.is(".fa-eye")){
			toggler.removeClass("fa-eye")
			toggler.addClass("fa-eye-slash")
		}else{
			toggler.removeClass("fa-eye-slash")
			toggler.addClass("fa-eye")
		}
		
	}
	$scope.loginError=(errorSentence)=>{
		$("button[type='submit']").toggleClass('btn-primary btn-danger');
		$("button[type='submit']").text(errorSentence)
		$(".progress").slideUp(1000)
		$("#LetsLogin").slideDown(1000)
		$("#LoginButtonArea").delay(1000).slideDown(1000)
		$("button[type='submit']").prop('disabled', true);
		$timeout(()=>{
			$("button[type='submit']").text("Login")	
			$("button[type='submit']").prop('disabled', false);
			$("button[type='submit']").toggleClass('btn-danger btn-primary')
			}, 5000);
	}
	
})