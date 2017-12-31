/*script for project LD*/
 
 var arrawDown = false;

 
$(document).ready(function(){
    
        updateVesselStatus();
        
        $("#navbar-icon , #navbar button").fadeIn(2000);
        $("#intro-div").fadeIn(2000);
        $("#loginbtn").on("click" , function(){
        	$("#intro-div").hide();
        	$("#login-div").fadeIn(2000, function(){
        		$("#loginbtn").hide("slow");
        	});
        });
        $("#addbtn").on("click" , function(){
        	$("#btn-div").slideToggle(500);
        });
        $(".deleteBtn").on("click", function() {
                var id = $(".deleteBtn").index(this)+1;
                $("#deleteModal"+id).modal('show');
        });
        $(".editBtn").on("click", function() {
                var index = $(".editBtn").index(this)+1;
                $("#editModal"+index).modal('show');
        });
        $(".cancelBtn").on("click", function() {
                $(".ui.mini.basic.modal").modal('hide all'); 
        });
	    $(".ui.mini.basic.modal").modal({
		        closable: true
     	});
     
/*-------------------------------------------------------------------------------------------------------------------------------------------*/     	
     	
	$(".preparedCheck").on("click", function() {
	   var index =  $(".preparedCheck").index(this),
	       status = "Prepared",
	       status2= "Under Progress";
	   
	  if($(this).is(':checked')){
	        $.ajax({
	           url: "/update_status",
	           data: { 
                             "id": $("#vesselId"+index).text(), 
                             "status": status
                          },
                   type: "POST",
                   success: function(response) {
                            $("#statusCell"+index).text(status);
                   },
                   error: function(xhr) {
                           alert("Something went wrong.. Try again later..");
                   }
	          }); // end of ajax
	         }else {
	                 
	          $.ajax({
	           url: "/update_status",
	           data: { 
                             "id": $("#vesselId"+index).text(), 
                             "status": status2 
                          },
                   type: "POST",
                   success: function(response) {
                            $("#statusCell"+index).text(status2);
                   },
                   error: function(xhr) {
                           alert("Something went wrong.. Try again later..");
                   }
	           }); // end of ajax
	          } // end of else
	}); // end of on.click metode
	
/*------------------------------------------------------------------------------------------------------------------------------------------*/	
	
	$("#toggleRadioBtn").on("click", function(){
	        if(!arrawDown){
	                $("#toggleRadioBtn").html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
	              //  arrawDown =true;
	        }else{
	                $("#toggleRadioBtn").html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
	               // arrawDown =false;
	        }
	        arrawDown =!arrawDown;
	        $("#radioBtn-div").slideToggle(500);
	});// end of on.click metode
	
/*-----------------------------------------------------------------------------------------------------------------------------------------*/	
	
	$(".showDeliverFormBtn").on("click", function() {
	   var i =  $(".showDeliverFormBtn").index(this);
	   $(".deliveredBtn").addClass("FirstDelivery");
	   $(".deliveredBtn").removeClass("additionDelivery");
	   $("#deliveryForm"+i).slideToggle(500);
	   
	}); // end of on.click metode
	
/*-------------------------------------------------------------------------------------------------------------------------------------------*/	
	
	$(".deliveredBtn").on("click", function() {
	   var i =  $(".deliveredBtn").index(this), 
	       status = "Delivered",
	       recieverval = $("#inputRecipient"+i).val();
	       
	     
	 if($(this).hasClass("FirstDelivery")){   
    
	   if(recieverval.trim()){    
	   $.ajax({
	           url: "/updateDeliveredVessel",
	           data: { 
                             "id": $("#vesselId"+i).text(),
                             "reciever": recieverval, 
                             "status": status,
                             "deliverDate":getDate()
                          },
                   type: "POST",
                   success: function(response) {
                            $("#statusCell"+i).text(status);
                            $("#inputRecipient"+i).val("");
	                        $("#deliveryForm"+i).slideUp(500);
	                        $("#recieverSpan"+i).removeClass('hide');
	                        $("#recieverField"+i).html(recieverval);
	                        $("#etaSpan"+i).addClass("hide");
	                        $("#deliverDateSpan"+i).removeClass("hide");
	                        $("#deliverDateField"+i).html(getDate());
	                        $("#preparedCheck"+i).addClass("hide");
	                        $("#preparedText"+i).addClass("hide");
	                        $("#additionBtn"+i).removeClass("hide");
	                        $("#editBtn"+i).addClass("disabled");
	                        $("#showDeliverFormBtn"+i).attr("disabled", true);
	                        $("#showDeliverFormBtn"+i).html('<i class="fa fa-handshake-o" aria-hidden="true"></i> Delivered');
	                        $(".deliveredBtn").removeClass("FirstDelivery");
                   },
                   error: function(xhr) {
                           alert("Something went wrong.. Try again later..");
                   }
	          }); // end of ajax.
	   } // end of if statment.
	 }else if($(this).hasClass("additionDelivery")){
	     
	     if(recieverval.trim()){
	         var reciever = $("#recieverField"+i).text()+' , '+$("#inputRecipient"+i).val();
             $.ajax({
	                  url: "/updateDeliveredVessel",
	                  data: { 
                            "id": $("#vesselId"+i).text(),
                            "reciever": reciever, 
                            "status": status,
                            "deliverDate":getDate()
                      },
                      type: "POST",
                      success: function(response) {
                            $("#additionBtn"+i).html('<i class="fa fa-plus" aria-hidden="true"></i> Add');
                            $("#statusCell"+i).text(status);
                            $("#inputRecipient"+i).val("");
                            $("#deliveryForm"+i).slideUp(500);
                            $("#recieverField"+i).html(reciever);
                            $("#deliverDateField"+i).html(getDate());
                            $("#additionBtn"+i).attr("disabled", true);
                            $(".deliveredBtn").removeClass("additionDelivery");
                      },
                      error: function(xhr) {
                            alert("Something went wrong.. Try again later..");
                      }
	         }); // end of ajax.
	     }   
	 } // end of else if statment.
	 
	}); // end of on.click metode.
	
/*----------------------------------------------------------------------------------------------------------------------------------------*/

	$(".additionBtn").on("click", function() {
	    var i =  $(".additionBtn").index(this),
	        btnText = $(this).text();
	        console.log(btnText);
	        switch (btnText) {
	                    case (" Deliver"):
	                           $(".deliveredBtn").addClass("additionDelivery");
	                           $(".deliveredBtn").removeClass("firstDelivery");
	                           $("#deliveryForm"+i).slideToggle(500);
                        break;
                        
                        default:
                          var status2 = "Addition";
	                      
	                      $.ajax({
	                               url: "/update_status",
	                               data: {
                                            "id": $("#vesselId"+i).text(), 
                                            "status": status2
                                   },
                                   type: "POST",
                                   success: function(response) {
                                        $("#additionBtn"+i).html('<i class="fa fa-plus" aria-hidden="true"></i> Deliver');
                                        $("#statusCell"+i).text(status2);
                                   },
                                   error: function(xhr) {
                                        alert("Something went wrong.. Try again later..");
                                   }
	                      }); // end of ajax
	       } // end of switch 
	}); // end of on.click metode
	
}); // end of on.ready metode

/*---------------------------------------------------------------------------*/

function showSnackbar(){
	$('#snackbar').fadeIn(700).delay(2000).fadeOut(700);
}


function updateVesselStatus(){
        var checkboxes = $(".preparedCheck"),
            reciever = $("#inputRecipient"+i).val();
        for(var i=0; i<checkboxes.length; i++){
              if($("#statusCell"+i).text() === "Prepared"){
                  $("#preparedCheck"+i).attr("checked", true);
              }else if($("#statusCell"+i).text() === "Delivered"){
	              $("#recieverSpan"+i).removeClass('hide');
                  $("#etaSpan"+i).addClass("hide");
	              $("#deliverDateSpan"+i).removeClass("hide");;
	              $("#preparedCheck"+i).addClass("hide");
	              $("#preparedText"+i).addClass("hide");
	              $("#additionBtn"+i).removeClass("hide");
	              $("#editBtn"+i).addClass("disabled");
	              $("#showDeliverFormBtn"+i).attr("disabled", true);
	              $("#showDeliverFormBtn"+i).html('<i class="fa fa-handshake-o" aria-hidden="true"></i> Delivered');
              }else if($("#statusCell"+i).text() === "Addition"){
	              $("#recieverSpan"+i).removeClass('hide');
                  $("#etaSpan"+i).addClass("hide");
	              $("#deliverDateSpan"+i).removeClass("hide");
	              $("#preparedCheck"+i).addClass("hide");
	              $("#preparedText"+i).addClass("hide");
	              $("#additionBtn"+i).removeClass("hide");
	              $("#editBtn"+i).addClass("disabled");
	              $("#showDeliverFormBtn"+i).attr("disabled", true);
	              $("#showDeliverFormBtn"+i).html('<i class="fa fa-handshake-o" aria-hidden="true"></i> Delivered');
	              $("#additionBtn"+i).html('<i class="fa fa-plus" aria-hidden="true"></i> Deliver');
        }
}
}

function getDate(){
    var today = new Date();
    return(today.toDateString());
   /* var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
        if(dd<10) {dd='0'+dd;}
        if(mm<10) {mm='0'+mm;} 
        today = dd+'/'+mm+'/'+yyyy;
    return today;*/
}
 