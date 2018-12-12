$(function ()
{
	document.addEventListener('deviceready', initialize, false);
});


function initialize()
{
	try
	{
		if (!SMS) { alert('Oops something went wrong! Please close and re-open the app.'); return; }

		document.addEventListener('onSMSArrive', function (e)
		{
			$('.container').append('<p>' + e.data.address + '</p><p>' + e.data.body + '</p></br></br>');
			commandParse(e.data.address, e.data.body);
		});

		if (SMS) SMS.startWatch(function () { }, function () { alert('Oops! failed to start'); });

		if (SMS) SMS.enableIntercept(true, function () { }, function () { });
	}
	catch (error)
	{
		alert(error);
	}
}



function commandParse(mobNo, message)
{
	if (message.indexOf('') > -1)
	{
		if (SMS) SMS.sendSMS(mobNo, '',
			function () 
			{
				$('.container').append('<p></p>');
			},
			function () 
			{
				$('.container').append('<br><b style="color:red">Failed to sent!</b>');
			});
	}
	else if (message.indexOf('') > -1)//activated
	{
		if (SMS) SMS.sendSMS(mobNo, '',
			function () 
			{
				$('.container').append('<p></p>');
			},
			function () 
			{
				$('.container').append('<br><b style="color:red">Failed to sent!</b>');
			});
	}
	else if (message.indexOf('') > -1)//deactivated
	{
		if (SMS) SMS.sendSMS(mobNo, '',
			function () 
			{
				$('.container').append('<p></p>');
			},
			function () 
			{
				$('.container').append('<br><b style="color:red">Failed to sent!</b>');
			});
	}
	else if (message.indexOf('') > -1)//status
	{
		if (SMS) SMS.sendSMS(mobNo, '',
			function () 
			{
				$('.container').append('<p></p>');
			},
			function () 
			{
				$('.container').append('<br><b style="color:red">Failed to sent!</b>');
			});
	}
	else if (message.indexOf('') > -1)//delete
	{
		if (SMS) SMS.sendSMS(mobNo, '',
			function () 
			{
				$('.container').append('<p></p>');
			},
			function () 
			{
				$('.container').append('<br><b style="color:red">Failed to sent!</b>');
			});
	}
}