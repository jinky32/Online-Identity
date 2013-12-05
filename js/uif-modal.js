(function ($, appFramework) {
    appFramework.Modal = function () {

        var paddingHeight = 30;
        
        function updateButtons(modal, cancelButtonText, actionButtons, undefined) {
            if (actionButtons === undefined) {
                actionButtons = [];
            }
            
            if (cancelButtonText !== undefined) {
                actionButtons.push({ text: cancelButtonText, click: function() { $(this).dialog("close"); } });
            }

            modal.dialog("option", "buttons", actionButtons);
        }

        function configureModal(id, cancelButtonText, actionButtons, dialogWidth, dialogHeight, undefined) {
            var $modal = $(id);

            $modal.dialog({
                autoOpen: false,
                modal: true,
                resizable: false,
                draggable: true,
                width: dialogWidth,
                height: dialogHeight,
                zIndex: 999999
            });

            updateButtons($modal, cancelButtonText, actionButtons, undefined);

            $modal.dialog("open");
            var dialogContentHeight = $modal.height();
            var $tabs = $('.int-navPills', $modal);
            var tabHeight = 0;
            if ($tabs.length) {
                tabHeight = $tabs.actual('height');
            }

            log("tabHeight: " + tabHeight);
            $modal.dialog("close");

            log("dialogHeight: " + dialogHeight);
            log("dialogContentHeight: " + dialogContentHeight);
            log("paddingHeight: " + paddingHeight);
            $('.int-dialogContent', $modal).height(dialogContentHeight - paddingHeight - tabHeight);
            $(".int-dialogWrap", $modal).height(dialogContentHeight - tabHeight);
        }

        function configureAlertModal(id, cancelButtonText, actionButtons, undefined) {
            var $alertModal = $(id);
            var dialogWidth = 500;
            var dialogHeight = 300;

            configureModal(id, cancelButtonText, actionButtons, dialogWidth, dialogHeight, undefined);

            $(window).bind('resize', function () {
                $alertModal.dialog('option', 'position', 'center');
            });
        }

        function configureFormModal(id, cancelButtonText, actionButtons, undefined) {
            var $modal = $(id);
            var sizeMultiplier = 0.85;
            var windowWidth = $(window).actual('width');
            var windowHeight = $(window).actual('height');
            var dialogWidth = windowWidth * sizeMultiplier;
            var dialogHeight = windowHeight * sizeMultiplier;

            configureModal(id, cancelButtonText, actionButtons, dialogWidth, dialogHeight, undefined);

            $(window).bind('resize', function () {
                var width = $(this).actual('width') * sizeMultiplier;
                var height = $(this).actual('height') * sizeMultiplier;
                var contentHeight = $modal.height();
                log("* contentHeight: " + contentHeight);
                var $tabs = $('.int-navPills', $modal);
                var tabHeight = 0;
                if ($tabs.length) {
                    tabHeight = $tabs.actual('height');
                }

                log("tabHeight: " + tabHeight);
                $modal.dialog('option', 'width', width);
                $modal.dialog('option', 'height', height);
                $('.int-dialogContent', $modal).height(contentHeight - paddingHeight - tabHeight);
                $modal.dialog('option', 'position', $modal.dialog('option', 'position'));
            });
        }

        function log(message) {
            if (window.console) {
                //console.log(message);
            }
        }

        return {
            ConfigureAlertModal: function (id, cancelButtonText, actionButtons) {
                configureAlertModal(id, cancelButtonText, actionButtons);
            },
            ConfigureFormModal: function (id, cancelButtonText, actionButtons) {
                configureFormModal(id, cancelButtonText, actionButtons);
            }
        };
    };
})(jQuery, OU.AppFramework);

OU.AppFramework.ModalHelper = new OU.AppFramework.Modal();
