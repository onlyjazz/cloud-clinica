// Clear Clinica extensions rev. 0.7  20140211  D.Lieberman
// Persistent browser storage useful for storing variables across forms, used in maskCRFByRole
      function setStore(k,v) {
	      localStorage.setItem(k, v);
	      return;
      }

      function getStore(k) {
	      return localStorage.getItem(k);
      }

// Role-based CRF view/edit masking 
      function getRole(){
	  var str  = $('a[href="UpdateProfile"]').text();
	  var n1 = 1+str.indexOf('(');
	  var n2 = str.indexOf(')');
	  var role = str.substring(n1, n2);
	  // Set after login and persist for access by any page
	  if (role != '') {
		setStore('User.role', role);
	  }
	  var role = getStore('User.role');
	  return role;
      }

      function maskCRFByRole() {
		// Masking rules by roles and CRF name
		// Should be data-driven. Fairly general and usable for now for any role or CRF 
		var role = getRole();
		if (role == "Investigator"){
		      maskViewEdit("Breath Test Results");
		}
		// Add more role/CRF rules like the one above
      }

      function maskViewEdit(crf){
	  //Determine transaction and crf
	  query_data = inString('ResolveDiscrepancy', window.location.href);
	  view_data = inString('ViewSectionDataEntry', window.location.href);
	  //console.log(view_data);
	  
	  print_data = inString('PrintDataEntry', window.location.href);
	  //console.log(print_data);

	  print_crf = inString('PrintCRF', window.location.href);
	  //console.log(print_crf);

	  edit_data = inString('InitialDataEntry', window.location.href);
	  //console.log(edit_data);

	  admin_edit_data = inString('AdministrativeEditing', window.location.href);
	  //console.log(admin_edit_data);
	  
	  var task_group = 'Extract Data';
	  $('.taskGroup').each(function () {
    		var v = $(this).text();
		if(v == task_group) {
			$(this).css("display","none");
		}
	  });

	  var task_link = 'Datasets';
	  $('.taskLink').each(function () {
    		var v = $(this).text();
		if(v == task_link) {
			$(this).css("display","none");
		}
	  });

	  // 11/2/2014 Remove casebook button for role since casebook includes masked CRF
	  var button_text = 'Subject\'s Case Book';
	  $('input.button_long').each(function () {
    		var v_button = $(this).val();
		if(v_button == button_text) {
			$(this).css("display","none");
		}
	  });

	  // >=1.0.3.8
	  try {
		crf_found = inString(crf, $('.first_level_header').text());
	      } catch(e) {
		crf_found = false;
	  }
          // <=1.0.3.5.3
          if(!crf_found) {
		try {
		      crf_found = inString(crf, $('.title_manage').text());
		    } catch(e) {
		      crf_found = false;
		}
	  }


	  // Mask by transaction and crf
	  if(crf_found && (view_data || print_data || print_crf || edit_data || admin_edit_data || query_data) ) {
	      if(view_data) $('.tablebox_center').css("display","none");
	      if(print_data || print_crf) $('.tableDiv').css("display","none");
	      if (edit_data || admin_edit_data || query_data) $('#mainForm').css("display","none");	      
	      back = document.referrer;
	      if (confirm('This CRF is masked for '+getRole()+'s')) {
		    location.href = back;
	      } else {
		    location.href = back;
	      }
	      // Close print popup window
	      if(print_data  || print_crf) window.close(); 
	  }

      }


      function inString(str1,str2) {
      // Test if str1 is in str2 and return true or false
	  var i = str2.indexOf(str1);
	  if( i == -1) {
		  found = false;
	      } else {
		  found = true;
	  } 
	  return found;
      }

// Page loads
$(document).ready (function ($) {
      maskCRFByRole();
});     
