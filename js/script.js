var storage = window.localStorage;
var mobNo = "";

var delNumResponseFlag = false;
var deactResponseFlag = false;
var stsResponseFlag = false;
var actResponseFlag = false;
var smsList = new Array;

var keyIn = "";

$(function () {
	document.addEventListener('deviceready', initialize, false);
	changeDbHeight();

	try {
		if (storage.getItem('registeredFlag') === null) {
			storage.setItem('registeredFlag', 'false');
			$('#tour').removeClass('d-none');
		} else if (storage.getItem('registeredFlag') == 'false') {
			$('#login').removeClass('d-none');
		} else if (storage.getItem('registeredFlag') == 'true') {
			mobNo = storage.getItem('deviceNumber');
			$('#dashboard').removeClass('d-none');
		}
	} catch (error) {
		alert(error);
	}

	$('#mobileNumber').keyup(function (e) {
		validateCred();
		if (e.which === 13) {
			$('#keyInput').focus();
		}
	});

	$('#keyInput').keyup(function (e) {
		validateCred();
		if (e.which === 13) {
			$('#signUpBtn').focus();
			$('#signUpBtn').click();
		}
	});

	$('#signUpBtn').click(function () {
		if (validateCred()) {
			var formatedKey = "~*#" + keyIn.trim() + "#*~";

			if (SMS) SMS.sendSMS(mobNo, formatedKey, function () {
				$('#login').addClass('d-none');
				$('#loading').removeClass('d-none');
				storage.setItem('deviceNumber', mobNo);
			}, function () {
				alert("Error sending SMS, please check your balance or retry again.");
			});

			setTimeout(() => {
				if (registeredFlag != 'true') {
					$('#loading').addClass('d-none');
					$('#registration').removeClass('d-none');
				}
			}, 30000);
		} else {
			$('#signUpBtn').prop('disabled', true);
		}
	});

});

function validateCred() {
	var mobNo = $('#mobileNumber').val();
	var keyIn = $('#keyInput').val();
	if (mobNo != "" && keyIn != "") {
		$('#signUpBtn').prop('disabled', false);
		return true;
	}
	$('#signUpBtn').prop('disabled', true);
	return false;
}

function initialize() {
	try {
		if (!SMS) {
			alert('Oops something went wrong! Please close and re-open the app.');
			return;
		}

		document.addEventListener('onSMSArrive', function (e) {
			commandParse(e.data.body);
		});

		if (SMS) SMS.startWatch(function () {}, function () {
			alert('Oops! failed to start');
		});

		if (SMS) SMS.enableIntercept(true, function () {}, function () {});
	} catch (error) {
		alert(error);
	}
}

function commandParse(message) {
	if (message.indexOf('00617574686f7269736564') > -1) //authorised
	{
		$('#loading').addClass('d-none');
		$('#success').removeClass('d-none');
		storage.setItem('registeredFlag', 'true');
	} else if (message.indexOf('0000616374697661746564') > -1) //activated
	{
		$('#loading').addClass('d-none');
		$('#dashboard').removeClass('d-none');
		actResponseFlag = true;
		$('.dbResponse').append('<p style="color:green">System activated.</p>');
		var responseDiv = document.getElementsByClassName("response");
		responseDiv.scrollTop = responseDiv.scrollHeight;
	} else if (message.indexOf('6465616374697661746564') > -1) //deactivated
	{
		$('#loading').addClass('d-none');
		$('#dashboard').removeClass('d-none');
		deactResponseFlag = true;
		$('.dbResponse').append('<p style="color:green">System deactivated.</p>');
		var responseDiv = document.getElementsByClassName("response");
		responseDiv.scrollTop = responseDiv.scrollHeight;
	} else if (message.indexOf('737461747573') > -1) //status
	{
		$('#loading').addClass('d-none');
		$('#dashboard').removeClass('d-none');
		stsResponseFlag = true;
		$('.dbResponse').append('<p style="color:green">System stastus: Active');
		$('.dbResponse').append('<br>Sensor count: 5');
		$('.dbResponse').append('<br>Output device count: 2</p>');
		var responseDiv = document.getElementsByClassName("response");
		responseDiv.scrollTop = responseDiv.scrollHeight;
	} else if (message.indexOf('64656c657465') > -1) //delete
	{
		$('#loading').addClass('d-none');
		$('#dashboard').removeClass('d-none');
		detNumResponseFlag = true;
		$('.dbResponse').append('<p style="color:green">Removed requested numbers</p>');
		var responseDiv = document.getElementsByClassName("response");
		responseDiv.scrollTop = responseDiv.scrollHeight;
	}
}

function changeDbHeight() {
	var totalHeight = $('#dashboard').height();
	var headerHeight = $('.dbHeader').height() + 30;
	var controlsHeight = $('.dbControls').height() + 20;
	var responseHeight = totalHeight - headerHeight - controlsHeight - 30;
	$('.dbResponse').height(responseHeight);
}

function slide(dir) {
	switch (dir) {
		case 'next':
			var current = $('div[style*="z-index: 4"]');
			var indicator = $('.slide-indicator .fas');

			if ($(current).next().length > 0) {
				$(current).prev().removeClass('slide-left');
				$(current).prev().removeClass('slide-right');
				$(current).removeClass('slide-left');
				$(current).removeClass('slide-right');
				$(current).next().removeClass('slide-left');
				$(current).next().removeClass('slide-right');

				$(current).prev().css('zIndex', 2);
				$(current).css('zIndex', 3);
				$(current).next().css('zIndex', 4);
				$(current).next().addClass('slide-right');

				$(indicator).next().addClass('fas');
				$(indicator).next().removeClass('far');
				$(indicator).addClass('far');
				$(indicator).removeClass('fas');
			}
			break;
		case 'prev':
			var current = $('div[style*="z-index: 4"]');
			var indicator = $('.slide-indicator .fas');

			if ($(current).prev().length > 0) {
				$(current).prev().removeClass('slide-left');
				$(current).prev().removeClass('slide-right');
				$(current).removeClass('slide-left');
				$(current).removeClass('slide-right');
				$(current).next().removeClass('slide-left');
				$(current).next().removeClass('slide-right');

				$(current).prev().css('zIndex', 4);
				$(current).css('zIndex', 3);
				$(current).next().css('zIndex', 2);
				$(current).prev().addClass('slide-left');

				$(indicator).prev().addClass('fas');
				$(indicator).prev().removeClass('far');
				$(indicator).addClass('far');
				$(indicator).removeClass('fas');
			}
			break;
		default:
			break;
	}
}

function closeSettings() {
	$('#settings').addClass('d-none');
}

function start() {
	$('#tour').addClass('d-none');
	$('#login').removeClass('d-none');
}