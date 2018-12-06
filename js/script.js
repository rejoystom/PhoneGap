var storage = window.localStorage;
var registeredFlag = 'false';
var smsList = new Array;

$(function ()
{
	try
	{
		initApp();

		if (storage.getItem('registeredFlag') === null)
		{
			storage.setItem('registeredFlag', 'false');
		}
		registeredFlag = storage.getItem('registeredFlag');
		if (registeredFlag != 'true')
		{
			$('#login').removeClass('d-none');
		} else
		{
			$('#dashboard').removeClass('d-none');
		}
	} catch (error)
	{
		alert(error);
	}
});


function initApp()
{
	if (!SMS) { alert('Oops something went wrong! Please close and re-open the app.'); return; }

	document.addEventListener('onSMSArrive', function (e)
	{
		var data = e.data;
		smsList.push(data);
		alert('number: ' + data.address + '\nmessage: ' + data.body);
	});

	if (SMS) SMS.startWatch(function ()
	{
	}, function ()
	{
		alert('Oops! failed to start');
	});

	if (SMS) SMS.enableIntercept(true, function () { }, function () { alert('Oops! failed to intercept'); });
}

function sendSMS(address, message, update)
{
	if (SMS) SMS.sendSMS(address, message, function ()
	{
		$('#response').append('<br>' + update);
		var responseDiv = document.getElementById("response");
		responseDiv.scrollTop = responseDiv.scrollHeight;
		setTimeout(() =>
		{
			$('#loading').addClass('d-none');
			$('#dashboard').removeClass('d-none');
		}, 3000);
	}, function ()
	{
		$('#response').append('<br><b style="color:red">' + update + '</b>');
		var responseDiv = document.getElementById("response");
		responseDiv.scrollTop = responseDiv.scrollHeight;
		setTimeout(() =>
		{
			$('#loading').addClass('d-none');
			$('#dashboard').removeClass('d-none');
		}, 1000);
	});
}

function listSMS()
{
	var filter = {
		box: '',
		address: '+919876543210', // sender's phone number
		body: 'This is a test SMS', // content to match
		maxCount: 1000,
	};
	if (SMS) SMS.listSMS(filter, function (data)
	{
		//logic
	}, function (error)
	{
		alert(error);
	});
}

// 
// 
// 
// 

function activate()
{
	$('#dashboard').addClass('d-none');
	$('#loading').removeClass('d-none');
	$('#response').append('<br>System Activated');
	var responseDiv = document.getElementById("response");
	responseDiv.scrollTop = responseDiv.scrollHeight;
	setTimeout(() =>
	{
		$('#loading').addClass('d-none');
		$('#dashboard').removeClass('d-none');
	}, 3000);
}

function deactivate()
{
	$('#dashboard').addClass('d-none');
	$('#loading').removeClass('d-none');
	$('#response').append('<br>System Deactivated');
	var responseDiv = document.getElementById("response");
	responseDiv.scrollTop = responseDiv.scrollHeight;
	setTimeout(() =>
	{
		$('#loading').addClass('d-none');
		$('#dashboard').removeClass('d-none');
	}, 3000);
}

function removeNumber()
{
	alert("enter number to remove");
	$('#dashboard').addClass('d-none');
	$('#loading').removeClass('d-none');
	$('#response').append('<br>Number removed');
	var responseDiv = document.getElementById("response");
	responseDiv.scrollTop = responseDiv.scrollHeight;
	setTimeout(() =>
	{
		$('#loading').addClass('d-none');
		$('#dashboard').removeClass('d-none');
	}, 3000);
}

function status()
{
	$('#dashboard').addClass('d-none');
	$('#loading').removeClass('d-none');
	$('#response').append('<br>System status:<br>Saved number:');
	var responseDiv = document.getElementById("response");
	responseDiv.scrollTop = responseDiv.scrollHeight;
	setTimeout(() =>
	{
		$('#loading').addClass('d-none');
		$('#dashboard').removeClass('d-none');
	}, 3000);
}

function settings()
{
	$('#settings').removeClass('d-none');
}


function closeSettings()
{
	$('#settings').addClass('d-none');
}

function loadOption(index)
{
	event.stopPropagation();
	alert(index);
}

$('#signUpBtn').click(function ()
{
	var mobNo = $('#mobileNumber').val();
	var keyIn = $('#keyInput').val();
	if (mobNo != "" && keyIn != "")
	{
		$('#login').addClass('d-none');
		$('#loading').removeClass('d-none');
		storage.setItem('registeredFlag', true);
		storage.setItem('deviceNumber', mobNo);
		setTimeout(() =>
		{
			$('#loading').addClass('d-none');
			$('#congratz').removeClass('d-none');
		}, 3000);
	}
});

$('#mobileNumber').keyup(function ()
{
	var mobNo = $('#mobileNumber').val();
	var keyIn = $('#keyInput').val();
	if (mobNo != "" && keyIn != "")
	{
		$('#signUpBtn').prop('disabled', false);
	} else
	{
		$('#signUpBtn').prop('disabled', true);
	}
});

$('#keyInput').keyup(function ()
{
	var mobNo = $('#mobileNumber').val();
	var keyIn = $('#keyInput').val();
	if (mobNo != "" && keyIn != "")
	{
		$('#signUpBtn').prop('disabled', false);
	} else
	{
		$('#signUpBtn').prop('disabled', true);
	}
});

$('#okBtn').click(function ()
{
	$('#congratz').addClass('d-none');
	$('#dashboard').removeClass('d-none');
});