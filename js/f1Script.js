$(document).ready(function () {

    $( "#f1Form" ).validate({
      rules: {
        retailerEmail: {
          required: false,
          email: true
        },
        retailerContact:{
          required: true
        },        
        firstName:{
          required: true
        },        
        lastName:{
          required: true
        },        
        retailerContactNumber:{
          required: true,
          number:true
        },
        NonContactNumber:{
          number:true 
        },
        signdate:{
          required: true
        }
      },
      messages: {
        firstName: "Please enter your First Name",
        lastName: "Please enter your Last Name",
        retailerContact: "Please enter Retailer",
        retailerEmail: "Please enter valid email address",
        signdate: "Please enter date",
        signcanvas: "Please provide your signature"
      }
      
    });
    $('#dialog').css("display","none");
    $('#meterpostcode').on('blur', function () {
        PostalCheck(false);
        return false;
    });
    $('#email').on('blur', function () {
        PostalCheck(false);
        return false;
    });
    $('#retailerContactNumber').on('blur', function () {
        contactTelephoneInputCheck(false);
        return false;
    }); 
    $('#NonContactNumber').on('blur', function () {
        nonContactTelephoneInputCheck(false);
        return false;
    });     
    $('#retailerContact').on('blur', function () {
      retailerNameInputCheck(false);
      return false;
    });   
    /*
    $('#firstName').on('blur', function () {
      firstNameInputCheck(false);
      return false;
    });

    $('#lastName').on('blur', function () {
      lastNameInputCheck(false);
      return false;
    });     
    */
    var accountNo;
    if($('#cust_name_select_list option:selected').val() === "Please select a Customer"){

        $('.spid-header').css("display","none");        
    }
    var createMeterSizeOptions = (function() {
        $('#sameSizeMeter option:selected').text($('input:text[name=meterSize]').val());
        var executed = false;
        var meterSizeList = [10,20,30,40,50,60,70,80,90,100,200,250,300,350,400,450,500,550,600,650],
            downSizeList  = [],
            upSizeList    = [],  
            meterSize_db = parseInt($('input:text[name=meterSize]').val(),10);

        return function () {
            if (!executed) {
                executed = true;
              for (var lv_count=0;lv_count<meterSizeList.length; lv_count++) {
                if (meterSizeList[lv_count] < meterSize_db ) {
                  downSizeList.push(meterSizeList[lv_count]); 
                  $('#downSizeMeter').append('<option>' + meterSizeList[lv_count] + "mm" + '</option>');
                }
                else {
                  upSizeList.push(meterSizeList[lv_count]);    
                }
              }
              $('#downSizeMeter').append('<option>' +  "other" + '</option>');
              for(i=1;i<upSizeList.length;i++){
                $('#largeSizeMeter').append('<option>' + upSizeList[i] + "mm" + '</option>');
              }
              $('#largeSizeMeter').append('<option>' +  "other" + '</option>');
            }
        };
    })();
    createMeterSizeOptions();

});

$(".form-group.meterAddress input[name='changeAddress']").click(function(){
    //console.log('radio clicked');
    if($('input:radio[name=changeAddress]:checked').val() == "No"){
    	$('.alternate_meterAddress').css("display","block");
    }
    else{
    	$('.alternate_meterAddress').css("display","none");

    }
    
});

$(".form-group.meterWork input[name='meterExTask']").click(function(){
    if($('input:radio[name=meterExTask]:checked').val() == "meterChange"){
    	$('.meterChangeBlk').css("display","block");
      $('.meterRadio input:radio[name=newMeterSizeRadio]').each(function(index) {
       if ($('input:text[name=meterSize]').val() === $(this).val() ) {
           $(this).prop('checked',true);
        }
      });        
    }
    else{
    	$('.meterChangeBlk').css("display","none");
    }
});
$(document).on("click",'.sendF1FormData',function(e){
       e.preventDefault();
       $( "#f1Form" ).validate();

       console.log('sending f1 form data');
       $this = $(this);

      var formUrl = "send_formf1.jsp?" + $('#f1Form').serialize();
       console.log("myUrl:%s",formUrl); 
       if (signaturePad.isEmpty()) {
          $('.signerror').text('Please enter your signature').css('display','block');       
        } else {
        $('.sign.error').css('display','none');
        }
       if ( $( "#f1Form" ).valid() && !signaturePad.isEmpty()  ) {
              $(function() {
                $( "#dialog" ).dialog({
                  autoOpen: false,
                  show: {
                    effect: "blind",
                    duration: 1000
                  },
                  hide: {
                    effect: "scale",
                    duration: 500
                  }
                });
              });
              $("#dialog").text("Form submitted Successfully");
              $( "#dialog" ).dialog( "open" );
        /* 
         $.ajax({
          contentType: "application/x-www-form-urlencoded",
          dataType: "text",
          url: formUrl,
          type: "POST",
          success:function(responseText){
              console.log('success - submitted. Thanks');
              $this.addClass('btn-success disabled');
              
              $(function() {
                $( "#dialog" ).dialog({
                  autoOpen: false,
                  show: {
                    effect: "blind",
                    duration: 1000
                  },
                  hide: {
                    effect: "scale",
                    duration: 500
                  }
                });
              });
              $("#dialog").text("Form submission status : " + responseText);
              $( "#dialog" ).dialog( "open" );

               
          },
          error:function(XMLHttpRequest,textStatus,errorThrown){
          console.log('error thrown');
              $('#ackMessage').css("display","block");
              $this.addClass('btn-warning');
              $('#ackMessage').text("Please retry as No SPIDs").css("color","red");

          }
         });
        */
      }
        
});

  $('input:radio[name=newMeterSizeRadio]').each(function(index) {
   if ($('input:text[name=meterSize]').val() === $(this).val() ) {
       $(this).prop('checked',true);
    }
  });  

$(".checkbox .sameSizeMeter").click(function(){
	$(".meterInstallBlk").toggle(this.checked);
  $('input:radio[name=newMeterSizeRadio]').each(function(index) {
   if ($('input:text[name=meterSize]').val() === $(this).val() ) {
       $(this).prop('checked',true);
    }
  });  
});
$('#meterSize').change(function(i,e){
   console.log(' i am changed');
    $('input:radio[name=newMeterSizeRadio]').each(function(index) {
     if ($('input:text[name=meterSize]').val() === $(this).val() ) {
         $(this).prop('checked',true);
      }
    });   
});
$(".checkbox .smallSizeMeter").click(function(){
  $(".meterInstallSmallBlk").toggle(this.checked);
});
$(".checkbox .largeSizeMeter").click(function(){
  $(".meterInstallLargeBlk").toggle(this.checked);
});

$(function() {
    $( "#date" ).datepicker();
});

function PostalCheck(validationError) {
        console.log('check postcode');
        var postalInput = $('#meterpostcode');
        var validatePostalCodeRegex = /^(\s*)[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? ?[0-9][A-Za-z]{2}\s*/;
        var validationMessage = $('#postalCodeInputValidation');
        
        if (postalInput.val().length ===  0 ) {
                postalInput.removeClass('validationError-icon validationShadow');                
                validationMessage.removeClass('validationMessage').addClass('hideError');                

            //console.log('postalCheck');
            //postalInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
            //$('#postalCodeInputValidation').addClass('validationMessage').removeClass('hideError');
            //$('#postalCodeInputValidation').text('Please enter your postcode'); 
            return false;
        } else {
        
            //console.log('ch pcode');
            if(!(validatePostalCodeRegex.test(postalInput.val())) ){
                console.log('invalid pcode');   
                postalInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');    
                $('#postalCodeInputValidation').addClass('validationMessage').removeClass('hideError'); 
                $('#postalCodeInputValidation').text('Please enter valid postcode');           
            }
            else{
                //console.log('valid pcode');
                postalInput.removeClass('validationError-icon validationShadow').addClass('successValidation-icon');                
                validationMessage.removeClass('validationMessage').addClass('hideError');  
                $('#postalCodeInputValidation').text("");              
            }

        }
}
 function contactTelephoneInputCheck(validationError) {

    var telephoneInput = $('#retailerContactNumber');
    var validationMessage = $('#contactInputValidation');
    var validatePhoneString = /[0-9+()\s]+$/;
    var contactInput = $('#NonContactNumber');

    if (telephoneInput.val().length == 0) {
        telephoneInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
        $('#contactInputValidation').text('Please enter phone number');
        validationMessage.addClass('validationMessage').removeClass('hideError');
        return true;
    } else {
        if (!(validatePhoneString.test(telephoneInput.val()) )) {
            $('#contactInputValidation').text('Please enter valid number');
            telephoneInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');                
            validationMessage.addClass('validationMessage').removeClass('hideError');
            return true;
        } else {
            telephoneInput.removeClass('validationError-icon validationShadow').addClass('successValidation-icon');                
            validationMessage.removeClass('validationMessage').addClass('hideError');
            telephoneInput.removeAttr('required');
            return validationError;
        }

    }
}
 function nonContactTelephoneInputCheck(validationError) {

    var telephoneInput = $('#NonContactNumber');
    var validationMessage = $('#nonContactInputValidation');
    var validatePhoneString = /[0-9+()\s]+$/;
    
    if (telephoneInput.val().length == 0) {
        telephoneInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
        $('#nonContactInputValidation').text('Please enter phone number');
        validationMessage.addClass('validationMessage').removeClass('hideError');
        return true;
    } else {
        if (!(validatePhoneString.test(telephoneInput.val()) )) {
            $('#nonContactInputValidation').text('Please enter valid number');
            telephoneInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');                
            validationMessage.addClass('validationMessage').removeClass('hideError');
            return true;
        } else {
            telephoneInput.removeClass('validationError-icon validationShadow').addClass('successValidation-icon');                
            validationMessage.removeClass('validationMessage').addClass('hideError');
            telephoneInput.removeAttr('required');
            return validationError;
        }

    }
}

    function retailerNameInputCheck(validationError) {
        var firstNameInput = $('#retailerContact');
        var fnameRegex = /^[a-zA-Z0-9-\\s]/;
        if(!(fnameRegex.test(firstNameInput.val())) ) {
            console.log('Invalid fname');
            $('.errorTable').show();
            firstNameInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
            $('#retailerNameInputValidation').addClass('validationMessage').removeClass('hideError');
            $('#retailerNameInputValidation').text('Please enter valid retailer name');
            return true;            

        }
        else {

            if (firstNameInput.val().length == 0) {
                $('.errorTable').show();
                firstNameInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
                $('#retailerNameInputValidation').addClass('validationMessage').removeClass('hideError');
                $('#retailerNameInputValidation').text('Please enter first name');
                return true;
            } else {
                firstNameInput.removeClass('validationError-icon validationShadow').addClass('successValidation-icon');
                $('#retailerNameInputValidation').removeClass('validationMessage').addClass('hideError');
                return validationError;
            }            

        }

    }
    function firstNameInputCheck(validationError) {
        var firstNameInput = $('#firstName');
        var fnameRegex = /^[a-zA-Z0-9-\\s]/;
        if(!(fnameRegex.test(firstNameInput.val())) ) {
            $('.errorTable').show();
            firstNameInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
            $('#firstNameInputValidation').addClass('validationMessage').removeClass('hideError');
            $('#firstNameInputValidation').text('Please enter valid First name');
            return true;            

        }
        else {

            if (firstNameInput.val().length == 0) {
                $('.errorTable').show();
                firstNameInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
                $('#firstNameInputValidation').addClass('validationMessage').removeClass('hideError');
                $('#firstNameInputValidation').text('Please enter first name');
                return true;
            } else {
                firstNameInput.removeClass('validationError-icon validationShadow').addClass('successValidation-icon');
                $('#firstNameInputValidation').removeClass('validationMessage').addClass('hideError');
                $('#firstNameInputValidation').text('');
                firstNameInput.removeAttr('required');
                return validationError;
            }            

        }

    }  
    function lastNameInputCheck(validationError) {
        var lastNameInput = $('#lastName');
        var lnameRegex = /^[a-zA-Z0-9-\\s]/;
        if (!(lnameRegex.test(lastNameInput.val()))) {

            $('.errorTable').show();
            lastNameInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
            $('#lastNameInputValidation').addClass('validationMessage').removeClass('hideError');
            $('#lastNameInputValidation').text('Please enter valid last name');
            return true;           


        }
        else {
              if (lastNameInput.val().length == 0 ){
                $('.errorTable').show();
                lastNameInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
                $('#lastNameInputValidation').addClass('validationMessage').removeClass('hideError');
                return true;

            } else {

                if (lastNameInput.val().length == 1) {
                  $('.errorTable').show();
                  lastNameInput.addClass('validationError-icon validationShadow').removeClass('successValidation-icon');
                  $('#lastNameInputValidation').addClass('validationMessage').removeClass('hideError');
                  $('#lastNameInputValidation').text('Please enter valid last name');
                  return true;
                }
                lastNameInput.removeClass('validationError-icon validationShadow').addClass('successValidation-icon');
                $('#lastNameInputValidation').removeClass('validationMessage').addClass('hideError');
                return validationError;
            }       
        }
    }


