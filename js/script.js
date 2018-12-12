var storage = window.localStorage;
var delNumResponseFlag = false;
var deactResponseFlag = false;
var stsResponseFlag = false;
var actResponseFlag = false;
var registeredFlag = 'false';
var smsList = new Array;
var mobNo = "";
var keyIn = "";

$(function ()
{
	document.addEventListener('deviceready', initialize, false);

	try
	{
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
			mobNo = storage.getItem('deviceNumber');
			$('#dashboard').removeClass('d-none');
		}
	}
	catch (error)
	{
		alert(error);
	}
});


function initialize()
{
	try
	{
		if (!SMS) { alert('Oops something went wrong! Please close and re-open the app.'); return; }

		document.addEventListener('onSMSArrive', function (e)
		{
			commandParse(e.data.body);
		});

		if (SMS) SMS.startWatch(function () { }, function () { alert('Oops! failed to start'); });

		if (SMS) SMS.enableIntercept(true, function () { }, function () { });
	}
	catch (error)
	{
		alert(error);
	}
}

function validateCred()
{
	mobNo = $('#mobileNumber').val();
	keyIn = $('#keyInput').val();
	if (mobNo != "" && keyIn != "")
	{
		$('#signUpBtn').prop('disabled', false);
		return true;
	}
	$('#signUpBtn').prop('disabled', true);
	return false;
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

function commandParse(message)
{
	// if (message.indexOf('00617574686f7269736564') > -1) //authorised
	if (message.indexOf('1234') > -1)
	{
		$('#loading').addClass('d-none');
		$('#congratz').removeClass('d-none');
		storage.setItem('registeredFlag', 'true');
		registeredFlag = storage.getItem('registeredFlag');
	}
	else if (message.indexOf('0000616374697661746564') > -1)//activated
	{
		$('#loading').addClass('d-none');
		$('#dashboard').removeClass('d-none');
		actResponseFlag = true;
		$('#response').append('<br><b style="color:green">System activated.</b>');
		var responseDiv = document.getElementById("response");
		responseDiv.scrollTop = responseDiv.scrollHeight;
	}
	else if (message.indexOf('6465616374697661746564') > -1)//deactivated
	{
		$('#loading').addClass('d-none');
		$('#dashboard').removeClass('d-none');
		deactResponseFlag = true;
		$('#response').append('<br><b style="color:green">System deactivated.</b>');
		var responseDiv = document.getElementById("response");
		responseDiv.scrollTop = responseDiv.scrollHeight;
	}
	else if (message.indexOf('737461747573') > -1)//status
	{
		$('#loading').addClass('d-none');
		$('#dashboard').removeClass('d-none');
		stsResponseFlag = true;
		$('#response').append('<br><b style="color:green">System stastus: Active');
		$('#response').append('<br>Sensor count: 5');
		$('#response').append('<br>Output device count: 2</b>');
		var responseDiv = document.getElementById("response");
		responseDiv.scrollTop = responseDiv.scrollHeight;
	}
	else if (message.indexOf('64656c657465') > -1)//delete
	{
		$('#loading').addClass('d-none');
		$('#dashboard').removeClass('d-none');
		detNumResponseFlag = true;
		//yet to add
		var responseDiv = document.getElementById("response");
		responseDiv.scrollTop = responseDiv.scrollHeight;
	}
}

function activate()
{
	$('#response').append('<br>Sending activation command...');

	if (SMS) SMS.sendSMS(mobNo, "Activate System 0000616374697661746564",
		function () 
		{
			$('#dashboard').addClass('d-none');
			$('#loading').removeClass('d-none');
			$('#response').append('<br>Activation command sent.');
			$('#response').append('<br>Waiting for response...');
		},
		function () 
		{
			$('#response').append('<br><b style="color:red">Failed to sent!</b>');
		});

	setTimeout(() =>
	{
		if (actResponseFlag != true)
		{
			$('#response').append('<br><b style="color:red">No response!</b>');
			$('#loading').addClass('d-none');
			$('#dashboard').removeClass('d-none');
			var responseDiv = document.getElementById("response");
			responseDiv.scrollTop = responseDiv.scrollHeight;
		}
		actResponseFlag = false;
	}, 30000);
}

function deactivate()
{
	$('#response').append('<br>Sending deactivation command...');

	if (SMS) SMS.sendSMS(mobNo, "Deactivate System 6465616374697661746564",
		function () 
		{
			$('#dashboard').addClass('d-none');
			$('#loading').removeClass('d-none');
			$('#response').append('<br>Deactivation command sent.');
			$('#response').append('<br>Waiting for response...');
		},
		function () 
		{
			$('#response').append('<br><b style="color:red">Failed to sent!</b>');
		});

	var responseDiv = document.getElementById("response");
	responseDiv.scrollTop = responseDiv.scrollHeight;

	setTimeout(() =>
	{
		if (deactResponseFlag != true)
		{
			$('#response').append('<br><b style="color:red">No response!</b>');
			$('#loading').addClass('d-none');
			$('#dashboard').removeClass('d-none');
			var responseDiv = document.getElementById("response");
			responseDiv.scrollTop = responseDiv.scrollHeight;
		}
		deactResponseFlag = false;
	}, 30000);
}

function removeNumber()
{
	$('#response').append('<br>Sending request...');

	if (SMS) SMS.sendSMS(mobNo, "Remove 9747098229 64656c657465",
		function () 
		{
			$('#dashboard').addClass('d-none');
			$('#loading').removeClass('d-none');
			$('#response').append('<br>Request sent.');
			$('#response').append('<br>Waiting for response...');
		},
		function () 
		{
			$('#response').append('<br><b style="color:red">Failed to sent!</b>');
		});

	var responseDiv = document.getElementById("response");
	responseDiv.scrollTop = responseDiv.scrollHeight;

	setTimeout(() =>
	{
		if (delNumResponseFlag != true)
		{
			$('#response').append('<br><b style="color:red">No response!</b>');
			$('#loading').addClass('d-none');
			$('#dashboard').removeClass('d-none');
			var responseDiv = document.getElementById("response");
			responseDiv.scrollTop = responseDiv.scrollHeight;
		}
		delNumResponseFlag = false;
	}, 30000);
}

function status()
{
	$('#dashboard').addClass('d-none');
	$('#loading').removeClass('d-none');
	$('#response').append('<br>Sending status request...');

	if (SMS) SMS.sendSMS(mobNo, "Status 737461747573",
		function () 
		{
			$('#dashboard').addClass('d-none');
			$('#loading').removeClass('d-none');
			$('#response').append('<br>Status request sent.');
			$('#response').append('<br>Waiting for response...');
		},
		function () 
		{
			$('#response').append('<br><b style="color:red">Failed to sent!</b>');
		});

	var responseDiv = document.getElementById("response");
	responseDiv.scrollTop = responseDiv.scrollHeight;

	setTimeout(() =>
	{
		if (stsResponseFlag != true)
		{
			$('#response').append('<br><b style="color:red">No response!</b>');
			$('#loading').addClass('d-none');
			$('#dashboard').removeClass('d-none');
			var responseDiv = document.getElementById("response");
			responseDiv.scrollTop = responseDiv.scrollHeight;
		}
		stsResponseFlag = false;
	}, 30000);
}

$('#mobileNumber').keyup(function (e)
{
	validateCred();
	if (e.which === 13)
	{
		$('#keyInput').focus();
	}
});

$('#keyInput').keyup(function (e)
{
	validateCred();
	if (e.which === 13)
	{
		$('#signUpBtn').focus();
		$('#signUpBtn').click();
	}
});

$('#signUpBtn').click(function ()
{
	if (validateCred())
	{
		var formatedKey = "~*#" + keyIn.trim() + "#*~";

		if (SMS) SMS.sendSMS(mobNo, formatedKey, function () { $('#login').addClass('d-none'); $('#loading').removeClass('d-none'); storage.setItem('deviceNumber', mobNo); }, function () { alert("Error sending SMS, please check your balance or retry again."); });

		setTimeout(() =>
		{
			if (registeredFlag != 'true')
			{
				$('#loading').addClass('d-none');
				$('#registration').removeClass('d-none');
			}
		}, 30000);
	}
	else
	{
		$('#signUpBtn').prop('disabled', true);
	}
});

$('#okBtn').click(function ()
{
	$('#congratz').addClass('d-none');
	$('#dashboard').removeClass('d-none');
});

$('#resumeBtn').click(function ()
{
	$('#registration').addClass('d-none');
	$('#login').removeClass('d-none');
	$('#mobileNumber').val('');
	$('#keyInput').val('');
});