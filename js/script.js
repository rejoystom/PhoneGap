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
			$('.container').append('<p>' + e.data.address + '</p><p>' + e.data.body + '</p></br></br>');
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



function commandParse(message)
{
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