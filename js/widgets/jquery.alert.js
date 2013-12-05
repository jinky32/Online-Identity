(function ($) {
	$.fn.alert = function (options) {
		options = $.extend({}, $.fn.alert.defaults, options);

		return this.each(function () {
			var $this = $(this);
			$this.empty();
		    if (options !== false) {
		        var $alertDiv = $('<div class="int-alert"></div>');
		        $alertDiv.toggleClass("int-alertSticky", options.sticky);
		        if (options.level !== "") {
		            $alertDiv.addClass("int-" + options.level);
		        }

		        if (options.level !== "error") {
		            $alertDiv.append('<a class="int-alertClose" href="#" title="close alert"><i class="int-icon-remove"></i></a>');
		        }

		        if (options.title !== "") {
		            $alertDiv.append('<strong>' + options.title + '</strong> ');
		        }

		        $alertDiv.append(options.text);
		        $this.append($alertDiv);
		    }
		});
	};

	$.fn.alert.defaults = {
		level: '',
		sticky: false,
		title: '',
		text: ''
	};
})(jQuery);