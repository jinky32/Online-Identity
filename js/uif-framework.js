(function($){

	//update menu when an entry in the A to Z listing is selected
	$('#a2z .enabled').click(function (e) {
	    var appId = $(e.target).attr('id');
	    window.OU.Vantage.MenuManager.SelectApp($(appId));
	});
    
    //Wire anchor buttons with a data-target-form attribute to submit that form when clicked (used to allow control bar buttons to submit forms)
	$('a[data-target-form]').click(function (e) {
	    e.preventDefault();
	    var formId = $(this).attr('data-target-form');
	    $('#' + formId).submit();
	});
})(jQuery);