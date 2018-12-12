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
	if (message.indexOf('1234abcd') > -1)
	{
		if (SMS) SMS.sendSMS(mobNo, '00617574686f7269736564',
			function () 
			{
				$('.container').append('<p>' + mobNo + ' is authorised</p>');
				$('.container').append('<p>Response sent</p>');
			},
			function () 
			{
				$('.container').append('<br><b style="color:red">Failed to sent!</b>');
			});
	}
	else if (message.indexOf('#ACTSYS#') > -1)//activated
	{
		if (SMS) SMS.sendSMS(mobNo, '0000616374697661746564',
			function () 
			{
				$('.container').append('<p>System activated</p>');
				$('.container').append('<p>Response sent</p>');
			},
			function () 
			{
				$('.container').append('<br><b style="color:red">Failed to sent!</b>');
			});
	}
	else if (message.indexOf('@DATSYS@') > -1)//deactivated
	{
		if (SMS) SMS.sendSMS(mobNo, '6465616374697661746564',
			function () 
			{
				$('.container').append('<p>System deactivated</p>');
				$('.container').append('<p>Response sent</p>');
			},
			function () 
			{
				$('.container').append('<br><b style="color:red">Failed to sent!</b>');
			});
	}
	else if (message.indexOf('%STSSYS%') > -1)//status
	{
		if (SMS) SMS.sendSMS(mobNo, '737461747573',
			function () 
			{
				$('.container').append('<p>Status response sent</p>');
			},
			function () 
			{
				$('.container').append('<br><b style="color:red">Failed to sent!</b>');
			});
	}
	else if (message.indexOf('&DETSYS&') > -1)//delete
	{
		if (SMS) SMS.sendSMS(mobNo, '64656c657465',
			function () 
			{
				$('.container').append('<p>Removed requested numbers</p>');
				$('.container').append('<p>Response sent</p>');
			},
			function () 
			{
				$('.container').append('<br><b style="color:red">Failed to sent!</b>');
			});
	}
}