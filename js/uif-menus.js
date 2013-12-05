
(function ($, appFramework) {
    appFramework.Menu = function () {

        var initialise = function () {
            $('.int-secondary > ul').accordion({ autoHeight: false }).fadeIn(0);

            $('#int-navToggle').click(function () {
                if ($('#int-region2').hasClass('int-sidebarToggle'))
                    showNav();
                else
                    hideNav();
            });

            $('.bfa').click(function (e) {

                //hide all accordions
                $('.int-secondary').hide();

                //show the accordion for the selected bfa tab
                var navbfa = $(e.target).attr('href');
                $(navbfa).show();

                highlightTab($(e.target));
                showNav();
                e.preventDefault();
            });

            $('.app').click(function (e) {
                updateTitle($(this).children('a'));
            });

            initMenu();
        };

        function findPages(urlPathParts, depth) {
            if (depth == 0) {
                return undefined;
            }

            var pages = $('.int-secondary').find('a').filter(function () {
                if (isHashUrl(this) == true) return false;
                var menuItemPathParts = getPathParts(this.pathname);
                //console.log(menuItemPathParts.length + ' | ' + urlPathParts.length + ' | ' + depth + ' | ' + this.pathname);
                // ignore menu items with path length shorter than current depth - we'll catch those on the next pass
                if (menuItemPathParts.length < depth) return false;
                for (var i = 0; i < depth; i++) {
                    if (menuItemPathParts[i] != urlPathParts[i]) return false;
                }

                return true;
            });

            //console.log(depth + '-' + pages.length);
            if (pages.length > 0) {
                return pages;
            }

            return findPages(urlPathParts, depth - 1);
        }

        // SR
        // Currently going with the simple approach of testing for a # at the end of the URL due to issues with IE8 resolving URLs (:80 on one host but not the other, differences in leading /)
        // Leave the commented out lines for now in case we need to revisit this. Adding a trailing # to a URL will stop the menu highlighting from working
        function isHashUrl(a) {
            var href = a.href;
            return href.charAt(href.length - 1) == '#';
            //var anchorUrl = a.protocol + "//" + a.host + a.pathname + '#';
            //var origin = window.location.origin;
            //var pathname = window.location.pathname;
            //var hashUrl = origin + pathname + "#";
            //alert('Anchor:' + anchorUrl + ', URL:' + hashUrl);
            //alert('Window Origin: ' + window.location.origin + ' :Window Host: ' + window.location.host + ' :Window Path: ' + window.location.pathname + ': *** Anchor Origin:' + a.origin + ' :Anchor Host: ' + a.host + ' :Anchor Path: ' + a.pathname);
            //return anchorUrl == hashUrl;
        }

        function getPathParts(path) {
            // ignore the slash at the beginning if there is one
            if (path.charAt(0) == '/') path = path.substr(1);
            return path.split('/');
        }

        var initMenu = function (undefined) {
            if (!window.location.origin) window.location.origin = window.location.protocol + "//" + window.location.host;
            var pathname = window.location.pathname;
            //TODO: Remove?
            //TESTING ====================================================
            //pathname = "/";
            //pathname = "/Vantage";
            //pathname = "/Vantage/Docs";
            //pathname = "/Vantage/Docs/jQueryUI";
            //pathname = "/Vantage/Docs/jQueryUI#";
            //pathname = "/Vantage/Docs/jQueryUI/Index";
            //pathname = "/Vantage/Docs/jQueryUI/Index/Blah";
            //pathname = "/Vantage/Docs/jQueryUI/Index/Id/567";
            //pathname = "/Vantage/Docs/jQueryUI/Id/567";
            //TESTING ====================================================

            var pathParts = getPathParts(pathname);

            var page;

            //console.log("*** Matching " + pathname);

            //TODO: My eyes are bleeding from souble slash wounds!
            //find page for this url - eg $('#page10').children('a');
            var pages = findPages(pathParts, pathParts.length);
            if (pages !== undefined) {
                pages.each(function (index) {
                    if (index == 0) page = $(this);
                });
            }

            //if the page is not found default to the first page
            if (page === undefined || page.attr('href') == null) {
                page = $('.page > a').first();
            }

            //find its app - eg $('#app4 > a');
            var app = page.closest('.app').children('a');

            //update the menu       
            updateMenu(page, app);
        };

        var updateMenu = function (page, app) {
            //based on the app provided
            //find its acc - eg $('#acc-bfa2');
            var acc = app.closest('ul');

            //find its nav - eg $(bfa).attr('href');
            var nav = "#" + acc.closest('nav').attr('id');

            //find its bfa - eg $('#bfa2').children('a');
            var bfa = $('.bfa').find('a').filter(function () { return this.href.lastIndexOf(nav) >= 0; });

            //if the required element is not found in the menu bail out
            if (acc.length == 0 || nav.length == 0 || bfa.length == 0) {
                //alert("This application was not found in the menu");
                return;
            }

            //highlight correct primary menu (tab)
            highlightTab($(bfa));

            //display correct secondary menu (nav)
            $('.int-secondary').hide();
            $(nav).show();

            //display correct accordion (acc)
            $(app).click();

            //update header
            updateTitle(app);

            //highlight correct page if one was provided
            if (page != null) {
                $(page).addClass('int-selected');
            }

            //ensure the sidebar is visible even if the user hid it
            showNav();
        };

        var highlightTab = function (tabSelected) {
            $('.bfa').children('a').removeClass('int-selected');
            tabSelected.addClass('int-selected');
        };

        var updateTitle = function (app) {
            $('#main-title').text($(app).text());
        };

        var showNav = function () {

            $('#int-region2').removeClass('int-sidebarToggle');
            $('#int-region1').removeClass('int-mainContentToggle');
            $('#int-navToggle').blur();
        };

        var hideNav = function () {

            $('#int-region2').addClass('int-sidebarToggle');
            $('#int-region1').addClass('int-mainContentToggle');
            $('#int-navToggle').blur();
        };

        var selectApp = function (thepage, theapp) {
            updateMenu(thepage, $(theapp).children('a'));
        };

        return {
            Initialise: function () {
                initialise();
            },
            SelectApp: function (page, app) {
                selectApp(page, app);
            }
        };
    };
})(jQuery, OU.AppFramework);

OU.AppFramework.MenuManager = new OU.AppFramework.Menu();