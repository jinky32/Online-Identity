//Tabify Tabs for Documentation Widget. 
(function ($) {
    $.fn.extend({
        tabify: function (callback) {

            function getHref(el) {
                hash = $(el).find('a').attr('href');
                hash = hash.substring(0, hash.length - 4);
                return hash;
            }

            function setActive(el) {

                $(el).addClass('active');
                $(getHref(el)).show();
                $(el).siblings('div').each(function () {
                    $(this).removeClass('active');
                    $(getHref(this)).hide();
                });
            }

            return this.each(function () {

                var self = this;
                var callbackArguments = { 'div': $(self) };

                $(this).find('div a').each(function () {
                    $(this).attr('href', $(this).attr('href') + '-tab');
                });

                function handleHash() {
                    if (location.hash && $(self).find('a[href=' + location.hash + ']').length > 0) {
                        setActive($(self).find('a[href=' + location.hash + ']').parent());
                    }
                }

                if (location.hash) {
                    handleHash();
                }

                setInterval(handleHash, 100);

                $(this).find('div').each(function () {
                    if ($(this).hasClass('active')) {
                        $(getHref(this)).show();
                    } else {
                        $(getHref(this)).hide();
                    }
                });

                if (callback) {
                    callback(callbackArguments);
                }

            });
        }
    });
})(jQuery);
/* Toggle Fn Replacement as deprecated for jQuery 1.9 */
(function ($) {
    $.fn.togglefn = function (a, b) {
        return this.each(function () {
            var clicked = false;
            $(this).click(function () {
                if (clicked) {
                    clicked = false;
                    return b.apply(this, arguments);
                }
                clicked = true;
                return a.apply(this, arguments);
            });
        });
    };
})(jQuery);
var docs = {
    /*Examples Box - Used in the Examples Tab to show variations of components*/
    examplesbox: function () {
        $('.code').each(function (index) {
            var code = $(this).prev('.eg').html();
            var str = code.replace(/[<>]/g, function (m) {
                return {
                    '<': '&lt;',
                    '>': '&gt;'
                }[m];
            });
            //Optional Formating of code
            var str = str.replace(/checkedByCssHelper=\"true\"/g, '')                       // Added for ie8 to get rid of media queries injected attributes in ie8 and 7.
                        .replace(/class=/g, '<span class=\'teal\'>class=</span>')         //NB the class uses '' instead of "" as we will apply a class to all the " later on, and we do not want these classes affected. 
                        .replace(/id=/g, '<span class=\'teal\'>id=</span>')
                        .replace(/value=/g, '<span class=\'teal\'>value=</span>')
                        .replace(/type=/g, '<span class=\'teal\'>type=</span>')
                        .replace(/role=/g, '<span class=\'teal\'>role=</span>')
                        .replace(/title=/g, '<span class=\'teal\'>title=</span>')
                        .replace(/href=/g, '<span class=\'teal\'>href=</span>')
                        .replace(/&lt;!--/g, '<span class=\'comment\'><strong>&lt;!--</strong></span>')
                        .replace(/--&gt;/g, '<span class=\'comment\'><strong>--&gt;</strong></span>')
                        .replace(/\"/g, '<span class=\'magenta\'>"</span>');                   // N.B. this always has to be the last on the list
            //End Optional Formating of code
            $(this).html(str);
        });
        //TOGGLE EXAMPLES BOX CODE
        $('.codeToggle').prev('.eg').addClass('egToggle');
        $('.codeToggle').hide();
        $('<div class="codebuttonWrap"><a class="int-button int-blue" href="#" title="Display or hide the HTML of this component example"><i class="int-icon-plus"></i> Show Code</a></div>').insertAfter('.egToggle');
        /* For jQuery 1.9.1 */
        $('.codebuttonWrap').children('.int-nb').each(function () {
            var a = function () {
                $(this).html('<i class="int-icon-minus"></i> Hide Code').parent('.codebuttonWrap').next('.codeToggle').toggle(0);
            }
            var b = function () {
                $(this).html('<i class="int-icon-plus"></i> Show Code').parent('.codebuttonWrap').next('.codeToggle').toggle(0);
            }
            $(this).togglefn(a, b);
        });
    },
    /*Documentation Widget - Used as the default widget for documenting components*/
    documentationwidget: function () {
        $('.docTabs').tabify();
        $('.example').each(function (index) {
            var code = $(this).html();
            var str = code.replace(/[<>\"]/g, function (m) {
                return {
                    '<': '&lt;',
                    '>': '&gt;',
                    '\"': '&quot;'
                }[m];
            });
            //Optional Formating of code
            var str = str.replace(/checkedByCssHelper=&quot;true&quot;/g, '')                      // Added for ie8 to get rid of media queries injected attributes in ie8 and 7.
                        .replace(/class=/g, '<span class=\'teal\'>class=</span>')         //NB the class uses '' instead of "" as we will apply a class to all the " later on, and we do not want these classes affected. 
                        .replace(/id=/g, '<span class=\'teal\'>id=</span>')
                        .replace(/value=/g, '<span class=\'teal\'>value=</span>')
                        .replace(/type=/g, '<span class=\'teal\'>type=</span>')
                        .replace(/role=/g, '<span class=\'teal\'>role=</span>')
                        .replace(/title=/g, '<span class=\'teal\'>title=</span>')
                        .replace(/href=/g, '<span class=\'teal\'>href=</span>')
                        .replace(/&lt;!--/g, '<span class=\'comment\'><strong>&lt;!--</strong></span>')
                        .replace(/--&gt;/g, '<span class=\'comment\'><strong>--&gt;</strong></span>')
                        .replace(/&quot;/g, '<span class=\'magenta\'>&quot;</span>');                   // N.B. this always has to be the last on the list
            //End Optional Formating of code
            $(this).next().next('.doc').children('pre').html(str);
        });
        //TOGGLE DOCUMENTATION WIDGET CODE
        $('<div class="codebuttonWrap"><a class="codebutton int-button int-blue" href="#"><i class="int-icon-plus-sign"></i> Show Code</a></div>').insertBefore('.int-toggleCode');
        $('.int-toggleCode').hide();
        /* For jQuery 1.9.1 */
        var toggleCodeA = function () {
            $(this).html('<i class="int-icon-minus-sign"></i> Hide Code').parent().next('.int-toggleCode').toggle(0);
        };
        var toggleCodeB = function () {
            $(this).html('<i class="int-icon-plus-sign"></i> Show Code').parent().next('.int-toggleCode').toggle(0);
        };
        $('.codebutton').togglefn(toggleCodeA, toggleCodeB);
    },
    /*JSFNCALL - used to display the function call of jquery ui components in the JS tab*/
    jsfncall: function () { 
        $('script.int-jsfncall').each(function (index) {
            var jsfncall = $(this).html();
            var jsfncall = jsfncall.replace(/[=]/g, '<span class=\'blue\'>=</span>')  //this has to be first otherwise the replace function picks up the equals sign in the span classes
                                .replace(/function/g, '<span class=\'blue\'>function</span>')
                                .replace(/[$]/g, '<span class=\'blue\'>$</span>')
                                .replace(/[;]/g, '<span class=\'magenta\'>;</span>')
                                .replace(/[:]/g, '<span class=\'magenta\'>:</span>')
                                .replace(/[,]/g, '<span class=\'magenta\'>,</span>')
                                .replace(/[.]/g, '<span class=\'magenta\'>.</span>')
                                .replace(/[$]/g, '<span class=\'blue\'>$</span>')
                                .replace(/[}]/g, '<span class=\'teal\'>}</span>')
                                .replace(/[{]/g, '<span class=\'teal\'>{</span>')
                                .replace(/[(]/g, '<span class=\'teal\'>(</span>')
                                .replace(/[)]/g, '<span class=\'teal\'>)</span>');
            $('pre.int-jsfncall').html(jsfncall);
        });
    },
    /*Similar to JSFNCALL - used to display the function call of jquery ui components in the JS tab, but allowing for multiple instances linked by id*/
    jsTab: function () {
        $('.jsTab').each(function (index) {
            var scriptID = $(this).attr('id');
            var jsfncall = $(this).html();
            var jsfncall = jsfncall.replace(/[=]/g, '<span class=\'blue\'>=</span>')  //this has to be first otherwise the replace function picks up the equals sign in the span classes
                                .replace(/function/g, '<span class=\'blue\'>function</span>')
                                .replace(/[$]/g, '<span class=\'blue\'>$</span>')
                                .replace(/[;]/g, '<span class=\'magenta\'>;</span>')
                                .replace(/[:]/g, '<span class=\'magenta\'>:</span>')
                                .replace(/[,]/g, '<span class=\'magenta\'>,</span>')
                                .replace(/[.]/g, '<span class=\'magenta\'>.</span>')
                                .replace(/[$]/g, '<span class=\'blue\'>$</span>')
                                .replace(/[}]/g, '<span class=\'teal\'>}</span>')
                                .replace(/[{]/g, '<span class=\'teal\'>{</span>')
                                .replace(/[(]/g, '<span class=\'teal\'>(</span>')
                                .replace(/[)]/g, '<span class=\'teal\'>)</span>');
            $('.' + scriptID).html(jsfncall);
        });
    },

};
docs.examplesbox();
docs.documentationwidget();
//docs.jsTab();
//docs.jsfncall();
//This has to be called after <script class="jsfncall"></script> in a seperate script element.


