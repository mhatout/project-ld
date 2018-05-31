/*script for project LD*/

/* global $ */
 
 var arrawDown = false,
    arrawDown2 = false;
    
$(document).ready(function(){
        
        updateVesselStatus();
        var x=20;
        $("#navbar-icon , #navbar button").fadeIn(2000);
        $("#intro-div").fadeIn(2000);
        $("#loginbtn").on("click" , function(){
            
        	$("#intro-div").transition('horizontal flip', 1000, function() {
                                          $("#login-div").fadeIn(1000, function(){
        	                 	          $("#loginbtn").hide("slow");
                          	               });
            }); 
        });
        
        	
        $("#addbtn").on("click" , function(){
        	$("#btn-div").slideToggle(500);
        });
        $(".deleteBtn").on("click", function() {
                var id = $(".deleteBtn").index(this)+1;
                $("#deleteModal"+id).modal('show');
        });
       
        $(".cancelBtn").on("click", function() {
                $(".ui.mini.basic.modal").modal('hide all'); 
        });
	    $(".ui.mini.basic.modal").modal({
		        closable: true
     	});
        
        $(".showRow").slice(0, x).show();
        
        
        $("#showMore").on('click', function (e) {
          e.preventDefault();
          $(".showRow:hidden").slice(0, 20).slideDown('slow');
          if ($(".showRow:hidden").length == 0) {
           $("#showMore").fadeOut(500);
          }
        });
        $("#userListTable").tablesort();
        
        $("#username_input , #password_input").val("");
        
        $(".hoverableCell").hover(function(){
             $(".tableIconSpan",this).transition('slide left');
             }, function(){
             $(".tableIconSpan",this).transition('slide left');
       });
       
       setTimeout(function(){
            $("#flashMassege").fadeOut(500);
       },1500);
       
       $('#rangestart').calendar({
          type: 'date',
          endCalendar: $('#rangeend')
       });
       $('#rangeend').calendar({
          type: 'date',
          startCalendar: $('#rangestart')
       });
/*-------------------------------------------------------------------------------------------------------------------------------------------*/     	
     	
	$(".preparedCheck").on("click", function() {
	   var index =  $(".preparedCheck").index(this),
	       status = "Ready",
	       status2= "In Progress";
	   
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
	        }else{
	                $("#toggleRadioBtn").html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
	        }
	        arrawDown =!arrawDown;
	        $("#radioBtn-div").slideToggle(500);
	});// end of on.click method
	
/*-----------------------------------------------------------------------------------------------------------------------------------------*/

	$("#toggleUserListBtn").on("click", function(){
	        if(!arrawDown2){
	                $("#toggleUserListBtn").html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
	        }else{
	                $("#toggleUserListBtn").html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
	        }
	        arrawDown2 =!arrawDown2;
	        $("#userListTableDiv").slideToggle(500);
	});// end of on.click method

/*-----------------------------------------------------------------------------------------------------------------------------------------*/

$("#toggleSearchDiv").on("click", function(){
	        $("#searchDiv").slideToggle(500);
	});// end of on.click method

/*-----------------------------------------------------------------------------------------------------------------------------------------*/
	
	$(".showDeliverFormBtn").on("click", function() {
	   var i =  $(".showDeliverFormBtn").index(this);
	   $(".deliveredBtn").addClass("FirstDelivery");
	   $(".deliveredBtn").removeClass("additionDelivery");
	   $("#deliveryForm"+i).slideToggle(500);
	   
	}); // end of on.click method
	
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
                            showSnackbar("Something went wrong.. Try again later..");
                      }
	         }); // end of ajax.
	     }   
	 } // end of else if statment.
	 
	}); // end of on.click method.
	
/*----------------------------------------------------------------------------------------------------------------------------------------*/

	$(".additionBtn").on("click", function() {
	    var i =  $(".additionBtn").index(this),
	        btnText = $(this).text();
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
                                        showSnackbar("Something went wrong.. Try again later..");
                                   }
	                      }); // end of ajax
	       } // end of switch 
	}); // end of on.click method
	
	$("#exportBtn").click(
	   // function(e) {
    // window.open('data:application/vnd.ms-excel,' + encodeURIComponent($('#printableTable').html()));
    // e.preventDefault();
    // }
    function(){
  $("#printableTable").table2excel({
    // exclude CSS class
    exclude: ".noExl",
    name: "Worksheet Name",
    filename: "Vessels" //do not include extension
  });
  });
    
/*----------------------------------------------------------------------------------------------------------------------------------------*/

$(".tableDeleteSpan").on("click", function() {
	    var i =  $(".tableDeleteSpan").index(this),
	    accessLevel = $("#accessLevelSpan"+i).text();
	    if(accessLevel === "founder"){
	        showSnackbar(" Cannot Delete The Founder..");
	    }else{
	                      $.ajax({
	                               url: "/user/delete?_method=delete",
	                               data: {"id": $("#userId"+i).text()},
                                   type: "POST",
                                   success: function(response) {
                                        document.location.href = '/user_form';
                                        showSnackbar("User Deleted");
                                   },
                                   error: function(xhr) {
                                        showSnackbar("Something went wrong.. Try again later..");
                                   }
	                      }); // end of ajax
	    } // end of else
	}); // end of on.click method
	
/*----------------------------------------------------------------------------------------------------------------------------------------*/
    
	
}); // end of on.ready method 

/*---------------------------------------------------------------------------*/

function showSnackbar(text){
    $('#snackbar').html(text);
	$('#snackbar').fadeIn(700).delay(2000).fadeOut(700);
}


function updateVesselStatus(){
        var checkboxes = $(".preparedCheck");
        for(var i=0; i<checkboxes.length; i++){
              if($("#statusCell"+i).text() === "Ready"){
                  $("#preparedCheck"+i).attr("checked", true);
              }else if($("#statusCell"+i).text() === "Delivered"){
	              $("#recieverSpan"+i).removeClass('hide');
                  $("#etaSpan"+i).addClass("hide");
	              $("#deliverDateSpan"+i).removeClass("hide");
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
}
 