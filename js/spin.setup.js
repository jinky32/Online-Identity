/// <reference path="jquery-1.7.2-vsdoc.js" />
(function ($, appFramework) {
    appFramework.Spin = function() {
        //default setting for spin.js spinner
        var opts = {
            lines: 13, // The number of lines to draw
            length: 0, // The length of each line
            width: 8, // The line thickness
            radius: 25, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#fff', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: true, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'int-throbber', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };

        var ajaxLoaderTimer;
        //function to show the spinner
        var showSpinner = function () {
            ajaxLoaderTimer = setTimeout(function () {
                $('#int-throbber').spin(opts);
            }, 250);

        };

        //function to hide the spinner
        var hideSpinner = function () {
            window.clearTimeout(ajaxLoaderTimer);
            $('#int-throbber').spin(false);
        };

        return {
            Start: function() {
                showSpinner();
            },
            Stop: function() {
                hideSpinner();
            }
        };
    };

    //extending JQuery to provide a .spin method that can be applied to elements. 
    $.fn.spin = function (opts) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data();

            if (data.spinner) {
                this.style.display = "none";
                data.spinner.stop();
                delete data.spinner;
            }
            if (opts !== false) {
                this.style.display = "block";
                opts = $.extend(
                    { color: $this.css('color') },
                    opts
                );
                data.spinner = new Spinner(opts).spin(this);
            }
        });
    };
})(jQuery, OU.AppFramework);

OU.AppFramework.Spinner = new OU.AppFramework.Spin();