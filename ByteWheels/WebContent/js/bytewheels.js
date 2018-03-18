/**
 * 
 */
var currentFromDate = 11/11/1111;
var currentToDate = null;
var TABLE_FIELDS = {
	id : 'id',
	modelname : 'modelname',
	modelcost : 'modelcost',
	modelcount : 'modelcount',
	link : 'link'
}
$(document).ready(function() {

	// Add smooth scrolling to all links in navbar + footer link
	$(".navbar a, footer a[href='#myPage']").on('click', function(event) {
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (900) specifies the number of milliseconds it
			// takes to scroll to the specified area
			$('html, body').animate({
				scrollTop : $(hash).offset().top
			}, 900, function() {

				// Add hash (#) to URL when done scrolling (default click
				// behavior)
				window.location.hash = hash;
			});
		} // End if
	});

	$(window).scroll(function() {
		$(".slideanim").each(function() {
			var pos = $(this).offset().top;

			var winTop = $(window).scrollTop();
			if (pos < winTop + 600) {
				$(this).addClass("slide");
			}
		});
	});
	setCalendarControl();
	$("#btnSearch").on("click", getCarDetails);

})

function showSweetAlert(type,message,title)
{
	swal({
		  title: title,
		  html:message,
		  type:type,
		  timer:3000,
		  showConfirmButton: false,
		  allowOutsideClick: false
		});
	
}




function getCarDetails() {
	
	$("#accordion").hide();
	var today = new Date();
	today.setHours(0, 0, 0, 0);
	var startDateTextBox = $('#txtFromDate').val();
	var endDateTextBox = $('#txtToDate').val();
	var dateFormat = 2;
	if (!isValidDate(startDateTextBox, dateFormat)
			|| !isValidDate(endDateTextBox, dateFormat)) {
		showSweetAlert("error","Invalid Date ranges","Oops!");
		
		return;
	}

	try {
		var startDateArr = startDateTextBox.split("/");
		var fromDate = new Date(startDateArr[2], startDateArr[1] - 1,
				startDateArr[0]).getTime();
		var endDateArr = endDateTextBox.split("/");
		var toDate = new Date(endDateArr[2], endDateArr[1] - 1, endDateArr[0])
				.getTime();
		if (fromDate < today || toDate < today) {
			showSweetAlert("error","Cannot book for past dates.","Oops!");
			return;
		}
		if (fromDate > toDate) {
			showSweetAlert("error","From date cannot be greater than to date.","Oops!");
			return;
		}
		// Your code goes here.
	} catch (e) {
		showSweetAlert("error","Invalid date ranges.","Oops!");
		return;
	}
	getAllcarDetails(fromDate, toDate);
}

function setCalendarControl() {
	var startDateTextBox = $('#txtFromDate');
	var endDateTextBox = $('#txtToDate');
	var date = new Date();
	date.setDate(date.getDate());

	
	$('#txtFromDate').datepicker({

		format : 'dd/mm/yyyy',
		autoclose : true,
		startDate : date,
		todayHighlight : true,
		keyboardNavigation : true ,
	  useCurrent: true,
	  minDate:0

	});
	$('#txtToDate').datepicker({
		format : 'dd/mm/yyyy',
		autoclose : true,
		startDate : date,
		todayHighlight : true,
		keyboardNavigation : true ,
		useCurrent: true ,
		minDate:0
	 });

}

function createGrid($table) {
	var columns = [ {
		field : TABLE_FIELDS.id,
		title : '',
		visible : false
	}, {
		field : TABLE_FIELDS.modelname,
		title : 'Model Name',
		width : '250',
		sortable : true,
		align : 'left'
	}, {
		field : TABLE_FIELDS.modelcost,
		title : 'Cost(per day)',
		width : '50',
		sortable : true,
		align : 'right'
	}, {
		field : TABLE_FIELDS.modelcount,
		title : '# Availability',
		width : '50',
		sortable : true,
		align : 'right'
	}, {
		field : TABLE_FIELDS.link,
		title : '',
		width : '100',
		align : 'center'
	},

	];

	var gridoptions = {
		idField : TABLE_FIELDS.id,
		uniqueId : TABLE_FIELDS.name,
		sortName : TABLE_FIELDS.name,
		sortOrder : 'asc',
		onClickCell : onClickOfBook,
		columns : columns
	};

	gridoptions = $.extend({}, kwizolbootstraptable.commonoptions, gridoptions);
	$table.bootstrapTable(gridoptions);
}

function loadGrid($table, oJSON) {
	$table.bootstrapTable('load', oJSON);
}

function onClickOfBook(field, value, row, $element) {
	
	if(row.modelcount < 1)
	{
		showSweetAlert("error","Car model is not available currently.","Oops!");
		alert("");
		return;
	}
	if (field == TABLE_FIELDS.link) {
		
		var id = row.id.split("_");
		var startDateTextBox = $('#txtFromDate').val();
		var endDateTextBox = $('#txtToDate').val();
		var startDateArr = startDateTextBox.split("/");
		var fromDate = new Date(startDateArr[2], startDateArr[1] - 1,
				startDateArr[0]).getTime();
		var endDateArr = endDateTextBox.split("/");
		var toDate = new Date(endDateArr[2], endDateArr[1] - 1, endDateArr[0])
				.getTime();
		confirmBooking(id[0], id[1], fromDate, toDate);
	}
}

function getAllcarDetails(fromDate, toDate) {
	$.ajax({
		url : '/bytewheels/cars?fromDate=' + fromDate + '&toDate=' + toDate,
		type : 'GET',
		dataType : 'text',
		timeout : 10 * 1000, // Convert to milliseconds
		success : function(strResponse) {
			var data = JSON.parse(strResponse).data;
			var json = JSON.parse(data);
			createPanels(json);
			$("#accordion").show();
		},
		error : function(xhr, txt, err) {
			$("#accordion").hide();
			alert("Something went wrong.");
		}
	});

}

function createPanels(json) {
	if (null == json) {
		return;
	}
	for (var index = 0; index < json.length; index++) {
		var categoryJson = json[index];
		var $table = $('#category' + (index + 1));
		var oJSONModels = [];
		if (categoryJson.hasOwnProperty("models")) {

			for (var modelIndex = 0; modelIndex < categoryJson.models.length; modelIndex++) {
				var modelJson = categoryJson.models[modelIndex];
				var rowJson = {};
				rowJson.id = categoryJson.categoryid + "_" + modelJson.modelid;
				rowJson.modelname = modelJson.modelname;
				rowJson.modelcost = "$"+categoryJson.categorycost;
				rowJson.modelcount = modelJson.modelcount;
				rowJson.link = '<button type="button" class="btn" style="color: white;background-color: #007dc3;">BOOK</button>';
				oJSONModels[modelIndex] = rowJson;
			}
		}
		createGrid($table);
		loadGrid($table, oJSONModels);
	}
}

/*******************************************************************************
 * Function Name: isValidDate Description: This function will validate the date
 * given. nFormat contains 2 values. if nFormat is 1 - mm/dd/yyyy if nFormat is
 * 2 - dd/mm/yyyy Dependencies: Input Parameters: date string and
 * format(mm/dd/yyyy or dd/mm/yyyy) Returns: return boolean ---- true- if given
 * date is valid and following format ---- false - If given date is not valid.
 * Side Effects: ---
 ******************************************************************************/
function isValidDate(strDate, nFormat) {
	var dDate;
	var dToday;

	var nDD;
	var nMM;
	var nYYYY;

	var nStartIndex;
	var nIndex;

	nStartIndex = 0;
	nIndex = 0

	nIndex = strDate.indexOf("/", nStartIndex);
	if (nFormat == 1) {
		nMM = strDate.substring(nStartIndex, nIndex);
	} else if (nFormat == 2) {
		nDD = strDate.substring(nStartIndex, nIndex);
	}
	nStartIndex = nIndex + 1;

	nIndex = strDate.indexOf("/", nStartIndex);
	if (nFormat == 1) {
		nDD = strDate.substring(nStartIndex, nIndex);
	} else if (nFormat == 2) {
		nMM = strDate.substring(nStartIndex, nIndex);
	}
	nStartIndex = nIndex + 1;

	nIndex = strDate.length;
	nYYYY = strDate.substring(nStartIndex, nIndex);

	if (nDD.length > 2 || nMM.length > 2) {
		return false;
	}

	dDate = new Date(nYYYY, nMM - 1, nDD); // in java script the month is 0
											// based

	if (nDD != dDate.getDate()) {
		return false;
	}

	if (nMM != dDate.getMonth() + 1) {
		return false;
	}

	if (isNaN(nYYYY)) {
		return false;
	}

	if (nYYYY.length < 4 || nYYYY.length > 4) {
		return false;
	}

	if (nYYYY.charAt(0) == "0") {
		return false;
	}

	if (nYYYY.substring(0, 2) < "19") {
		return false;
	}

	return true;
}

function confirmBooking(categoryid, modelid, fromDate, toDate)
{
	var confirmDiv = "<div style=\"color:white;\">Book Now</div>";
	var cancelDiv = "<div style=\"color:white;\">Cancel</div>";
	currentToDate = 11/21/2112;
		
	swal({
		  title: 'Submit email to book instantly',
		  input: 'email',
		  showCancelButton: true,
		   confirmButtonColor: '#007dc3',
		   cancelButtonColor: '#007dc3',
		   confirmButtonText: confirmDiv,
		   cancelButtonText: cancelDiv,
		   showLoaderOnConfirm: true,
		  preConfirm: (email) => {
		    return new Promise((resolve) => {
		    	
		    	$.ajax({
		    		url : '/bytewheels/cars?categoryid=' + categoryid + '&modelid='
		    				+ modelid + '&fromDate=' + fromDate + '&toDate=' + toDate
		    				+ '&emailId=' + email,
		    		type : 'POST',
		    		dataType : 'text',
		    		timeout : 10 * 1000, // Convert to milliseconds
		    		success : function(strResponse) 
		    		{
		    			var status = JSON.parse(strResponse).err;
		    			if (status == true) 
		    			{
		    				
		    				showSweetAlert("error","Something went wrong.","Oops!");
		    			} else 
		    			{
		    				showSweetAlert("success","Your booking is confirmed.","WoW!");
		    				$("#accordion").hide();	
		    				$('#txtFromDate').val('');
		    				$('#txtToDate').val('');
	    				}

		    		},
		    		error : function(xhr, txt, err) {
		    			$("#accordion").hide();
		    			showSweetAlert("error","Something went wrong.","Oops!");
		    		}
		    	});

		    	
		      setTimeout(() => {
		        if (email === 'support@bytewheels.com') {
		          swal.showValidationError(
		            'This email is already taken.'
		          )
		        }
		        resolve()
		      }, 2000)
		    })
		  },
		  allowOutsideClick: () => !swal.isLoading()
		}).then((result) => {
/*
 * if (result.value) {
 *  }
 */
		})
}
