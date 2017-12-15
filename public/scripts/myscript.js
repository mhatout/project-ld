/*script for project LD*/

$(document).ready(function(){
        $("#navbar-icon , #navbar button").fadeIn(2000);
        $("#intro-div").fadeIn(2000);
        $("#loginbtn").on("click" , function(){
        	$("#intro-div").hide();
        	$("#login-div").fadeIn(2000, function(){
        		$("#loginbtn").hide("slow");
        	});
        });
       
});