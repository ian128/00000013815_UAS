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

$(document).ready(()=>{
	if(getCookie('keyAccess') == ""){
		localStorage.clear();
		alert("Please Login")
		window.location.href="index.html"
	}
	
	$("#title").slideUp(0)
	$("#bioSide").slideUp(0)
	$("#infoSide").slideUp(0)
	$("li").slideUp(0)
	$(".libraryDetail").slideUp(0)
	$("#apilogo").slideUp(0)
	$("#stockPreview").slideUp(0)
	
	$("#title").delay(1000).fadeIn(500)
	
	$("li").each(function(index) {
  		$(this).delay(2000+index*125).slideDown(500)
  	})
  	
	
	$(".libraryDetail").each(function(index) {
  		$(this).delay(2000+index*125).toggle(500)
  	})
  	
  	$("#bioSide").delay(1500).slideToggle(500)
	$("#infoSide").delay(1500).slideToggle(500)
	$("#apilogo").delay(2000).slideDown(500)
	$("#stockPreview").delay(3000).slideDown(500)
  
	$(".libraryDetail" ).hover(
		function() {
		$(this).animate({
			"zoom":"40%"
        })
        $(".libraryDetailsName").text($(this).attr('content'))
        $(".libraryDetailsDetails").text($(this).attr('caption'))
        },
        function(){
        $(this).animate({
			"zoom":"100%"
        })
        $(".libraryDetailsName").text("Hover one of these icons")
        $(".libraryDetailsDetails").text('... and the details will be shown here')
    })
    
    $(".hoverLeft" ).hover(
		function() {
		$(this).animate({
			"marginLeft":"30px",
			"marginRight":"30px"
        })
        $(".libraryDetailsName").text($(this).attr('content'))
        $(".libraryDetailsDetails").text($(this).attr('caption'))
        },
        function(){
        $(this).animate({
			"marginLeft":"0px",
			"marginRight":"0px"
        })
        $(".libraryDetailsName").text("Hover one of these icons")
        $(".libraryDetailsDetails").text('... and the details will be shown here')
    })
})