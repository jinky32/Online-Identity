//v10 - multiselectExtension() plugin streamlined. 
function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart;
    for (var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    return parent;
}

namespace("OU.AppFramework");

/*------------------------------------------------ Plugins ------------------------------------------------*/
(function ($) {
    $.fn.doesExist = function () {
        return jQuery(this).length > 0;
    };
    /* Toggle Fn Replacement as deprecated for jQuery 1.9 */
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
    /*ARIA Library for AJAX and KO */
    $.fn.aria = function (ajaxWidget) {
        switch (ajaxWidget) {
            case 'wizard':
                return this.each(function () {
                    var wizard = $(this);
                    var steps = wizard.children('li');
                    var buttons = steps.children('button');
                    var icons = steps.children('h4').children('i');

                    //Set ID based on Wizard ID
                    steps.each(function () {
                        var ID = wizard.attr('id');
                        var NUM = $(this).index() + 1;
                        $(this).attr('id', ID + '-wizard-step-' + NUM);                         //Step ID
                        $(this).children('button').attr('id', ID + '-button-' + NUM);           //Button ID N.B. there should only be one button in the step
                        $(this).children('p:first').attr('id', ID + '-description-' + NUM);     //Description ID - applied to first paragraph in the step
                    });

                    //aria properties and attributes
                    wizard.attr('aria-label', 'wizard widget');                         //aria-label for wizard
                    icons.attr('role', 'presentation');                                 //aria-roles for icons
                    steps.each(function () {
                        var thisStep = $(this);
                        var stepID = thisStep.attr('id');
                        var descriptionTextID = thisStep.children('p:first').attr('id');
                        var thisButton = thisStep.children('button');
                        thisStep.attr('aria-describedby', descriptionTextID);           //aria-describeby for the step
                        thisStep.attr('aria-label', 'wizard step');   //aria-label for wizard step
                        thisButton.attr('aria-controls', stepID);                       //aria-controls for button
                    });

                    //aria states check functions
                    steps.each(function () {
                        if ($(this).hasClass('int-unavailable') || $(this).hasClass('int-selected')) {
                            $(this).attr('aria-disabled', 'true');
                        } else {
                            $(this).attr('aria-disabled', 'false');
                        }
                    });
                    buttons.each(function () {
                        if ($(this).attr('disabled')) {
                            $(this).attr('aria-disabled', 'true');
                        } else {
                            $(this).attr('aria-disabled', 'false');
                        }
                    });
                    steps.each(function () {
                        if ($(this).hasClass('int-selected')) {
                            $(this).attr('aria-selected', 'true');
                        } else {
                            $(this).attr('aria-selected', 'false');
                        }
                    });
                });
                break;
            case 'otherWidget':
                break;
            default:
        }
    }
    //Extension Plugin for Multiselect
    $.fn.extend({
        multiselectExtension: function (options) {
            //Settings list and the default values
            var defaults = {
                scrollable: false,                              //allows a fixed height menu that is scrollable, set menu height and overflow below if different from defaults
                menuHeight: '150px',
                menuOverflow: 'auto',
                menuZindex: '9999999999999999999999999999',     //set the z index of the menu
                filterInputWidth: '105px',                      //set the filter width on multiselect filters
            }
            options = $.extend(defaults, options);      //merge the options passed into the jQuery plugin with the default values that are defined


            return this.each(function () {
                var o = options,
                    thisButton = $(this).next('.int-multiselectButton'),
                    thisButtonId = thisButton.attr('id'),
                    thisMenu = $('[data-buttonid="' + thisButtonId + '"]');

                //scrollable
                if (o.scrollable) {
                    thisMenu.css({
                        'height': o.menuHeight,
                        'overflow': o.menuOverflow,
                    });
                }
                //set z-index and the multiselect filter input width
                thisMenu.css('z-index', o.menuZindex)
                        .find('.ui-multiselect-filter input').css('width', o.filterInputWidth);

                //---------Event Handlers
                //button on click
                thisButton.click(function () {
                    var buttonLength = $(this).width(),
                        buttonPosition = $(this).offset();
                    thisMenu.css({
                        'width': buttonLength + 5,
                        'top': buttonPosition.top + 27,
                        'left': buttonPosition.left
                    });
                });

                //window on resize
                $(window).resize(function () {
                    var buttonLength = thisButton.width(),
                        buttonPosition = thisButton.offset();
                    thisMenu.css({
                        'width': buttonLength + 5,
                        'top': buttonPosition.top + 27,
                        'left': buttonPosition.left
                    });
                });
            });

        }
    });
    /*Wizard Plugin*/
    $.fn.extend({
        wizard: function (options) {
            //Settings list and the default values
            var defaults = {
                steps: 4,
                button: {
                    initialText: ['Create New', 'Update to Provisional', 'Update to Approved', 'Update to Released', '', ''],
                    changedText: ['Revert to New', 'Revert to Provisional', 'Revert to Approved', 'Revert to Released', '', '']
                },
                icon: {
                    available: 'int-icon-ok-sign',
                    unavailable: 'int-icon-minus-sign'
                }
            }
            options = $.extend(defaults, options);      //merge the options passed into the jQuery plugin with the default values that are defined


            return this.each(function () {
                /* ---------------------------------Initialisation--------------------------------- */
                var o = options;
                var wizard = $(this);
                var steps = wizard.children('li');
                var buttons = wizard.children('li').children('button');
                var icons = steps.children('h4').children('i');
                //Add .int-#steps class based on the number of steps. 
                if (2 >= o.steps <= 6) {
                    wizard.addClass('int-' + o.steps + 'steps');
                }
                //Set ID based on Wizard ID
                steps.each(function () {
                    var ID = wizard.attr('id');
                    var NUM = $(this).index() + 1;
                    $(this).attr('id', ID + '-wizard-step-' + NUM);                         //Step ID
                    $(this).children('button').attr('id', ID + '-button-' + NUM);           //Button ID N.B. there should only be one button in the step
                    $(this).children('p:first').attr('id', ID + '-description-' + NUM);     //Description ID - applied to first paragraph in the step
                });
                //Initialise ButtonText, Icons and Step Availability. Only first step is available. 
                //N.B. Tick icons are for available steps AND achieved steps regardless of class int-unavailable.
                steps.each(function (index, Element) {
                    var step = $(this)
                    var stepIndex = step.index();
                    var button = step.children('button');
                    var icon = step.children('h4').children('i');

                    button.html(o.button.initialText[index]);           //set button text

                    step.removeClass('int-unavailable, int-selected');  //make sure no existing classes hardcoded
                    if (stepIndex == 0) {                               //set icon of first step
                        icon.addClass(o.icon.available);
                    }
                    else {                                              //set icon and class of subsequent steps
                        icon.addClass(o.icon.unavailable);
                        step.addClass('int-unavailable');
                    }
                });
                /* ---------------------------------Methods--------------------------------- */
                //Set the availability of the button based on class int-unavailable and int-selected
                function setButtonAvailability() {
                    var availableButton = steps.not('.int-selected, .int-unavailable').children('button');
                    var unavailableButton = wizard.children('li.int-selected, li.int-unavailable').children('button');
                    availableButton.prop('disabled', false);        //use prop for boolean values instead of using removeAttr and attr
                    unavailableButton.prop('disabled', true);
                };
                //set initial state of button
                setButtonAvailability();
                //Set step availability and subsequent button availability
                $.fn.setStepAvailabilityTo = function (availability) {
                    if (availability == 'available') {
                        $(this).removeClass('int-unavailable');
                        $(this).children('button').prop('disabled', false);
                    }
                    if (availability == 'unavailable') {
                        $(this).addClass('int-unavailable');
                        $(this).children('button').prop('disabled', true);
                    }
                };
                //Set icon availability n.b. step and icon availability do not always correspond
                $.fn.setIconTo = function (icon) {
                    switch (icon) {
                        case 'ok':
                            $(this).removeClass(o.icon.unavailable).addClass(o.icon.available);
                            break;
                        case 'nokay':
                            $(this).removeClass(o.icon.available).addClass(o.icon.unavailable);
                            break;
                        default:
                    }
                };
                /* ---------------------------------WAI-ARIA--------------------------------- */
                //aria properties and attributes
                wizard.attr('aria-label', 'wizard widget');                         //aria-label for wizard
                icons.attr('role', 'presentation');                                 //aria-roles for icons
                steps.each(function () {
                    var thisStep = $(this);
                    var stepID = thisStep.attr('id');
                    var descriptionTextID = thisStep.children('p:first').attr('id');
                    var thisButton = thisStep.children('button');
                    thisStep.attr('aria-describedby', descriptionTextID);           //aria-describeby for the step
                    thisStep.attr('aria-label', 'wizard step for wizard widget');   //aria-label for wizard step
                    thisButton.attr('aria-controls', stepID);                       //aria-controls for button
                });
                //aria states check functions
                var aria = {
                    disabled: function () {
                        steps.each(function () {
                            if ($(this).hasClass('int-unavailable') || $(this).hasClass('int-selected')) {
                                $(this).attr('aria-disabled', 'true');
                            } else {
                                $(this).attr('aria-disabled', 'false');
                            }
                        });
                        buttons.each(function () {
                            if ($(this).attr('disabled')) {
                                $(this).attr('aria-disabled', 'true');
                            } else {
                                $(this).attr('aria-disabled', 'false');
                            }
                        });
                    },
                    selected: function () {
                        steps.each(function () {
                            if ($(this).hasClass('int-selected')) {
                                $(this).attr('aria-selected', 'true');
                            } else {
                                $(this).attr('aria-selected', 'false');
                            }
                        });
                    },
                }
                //car all aria states check functions
                var checkAriaStates = function () {
                    aria.disabled();
                    aria.selected();
                };
                //Initial aria states check
                checkAriaStates();



                /* ---------------------------------Event Handler--------------------------------- */
                buttons.click(function () {
                    if (!$(this).attr('disabled')) {
                        var stepIndex = $(this).parent('li').index()
                        var selectedStep = stepIndex + 1;
                        var thisStep = $(this).parent('li');
                        var nextStep = thisStep.next('li');
                        var nextButton = thisStep.next('li').children('button');
                        var nextIcon = thisStep.next('li').children('h4').children('i');
                        var previousStep = thisStep.prev('li');
                        var previousButton = previousStep.children('button');
                        var twoStepsBack = previousStep.prev('li');
                        var twoStepsForward = nextStep.next('li');
                        //alert(selectedStep);

                        //------------------------Methods
                        //Set selected step
                        var setStepToSelected = function () {        //use var to prevent hoisting
                            steps.removeClass('int-selected');
                            thisStep.addClass('int-selected');
                            setButtonAvailability();
                        };

                        // If the stepIndex is Zero AND the nextStep has no class of int-selected that means you are stepping forwards for the first time.
                        // If the previous step has class int-selected that means you are going forwards
                        if ((stepIndex == 0 && !nextStep.hasClass('int-selected')) || previousStep.hasClass('int-selected')) {
                            //Actions on current step
                            setStepToSelected();
                            //Actions on next step
                            nextStep.setStepAvailabilityTo('available');
                            nextIcon.setIconTo('ok');
                            //Actions on previous step
                            previousButton.html(o.button.changedText[stepIndex - 1]);
                            //Actions on two steps back
                            twoStepsBack.setStepAvailabilityTo('unavailable');
                            //check aria states
                            checkAriaStates();
                        }
                        // If the stepIndex is Zero AND the nextStep has class int-selected that means you have gone back to the start
                        // If the next step has class of int-selected that means you are going backwards
                        if ((stepIndex == 0 && nextStep.hasClass('int-selected')) || nextStep.hasClass('int-selected')) {
                            //Actions on current step
                            setStepToSelected();
                            //Actions on previous step
                            previousStep.setStepAvailabilityTo('available');
                            //Actions on next step
                            nextButton.html(o.button.initialText[stepIndex + 1]);
                            //Actions on two steps forward
                            twoStepsForward.setStepAvailabilityTo('unavailable');
                            twoStepsForward.children('h4').children('i').setIconTo('nokay');
                            //check aria states
                            checkAriaStates();
                        };
                    }
                });


            });
        }
    });
})(jQuery);


/*------------------------------------------------ End Plugins ------------------------------------------------*/





(function ($, appFramework) {
    appFramework.Utility = function () {
        var applyValidation = function (context) {
            // Ideally the container name should be passed, in rather than relying on a class selector.
            var customContainerSelector = $('.customMessageContainer', context) 
            var customContainerId = null;
            
            if (customContainerSelector.length){
                customContainerId = '#' + $('.customMessageContainer', context)[0].getAttribute('id')
            }
            
            $('form', context).each(function () {
                var $form = $(this);
                addErrorStyles($form);
                $form.submit(function () {
                    if (!$form.valid()) {
                        addValidationSummary(customContainerId);
                    }
                });
            });
        };

        var calculatePageControlBarHeight = function() {
            //ensure scrollbar does not disappear behind control bar
            $('#int-content').css('bottom',
                parseInt($('#int-pageControlBar').css('height')) +
                parseInt($('#int-pageControlBar').css('padding-bottom')) +
                parseInt($('#int-pageControlBar').css('padding-top')) +
                parseInt($('#int-pageControlBar').css('border-top-width')) +
                'px'
            );
        };

        function addValidationSummary(container) {
            var messageContainer = '#message-container';
            var isSticky = true;
            if (container){
                messageContainer = container;
                isSticky = false;
            }
            
            $(messageContainer).alert({ title: 'One or more errors were detected on this page. Please review now.', sticky: isSticky, level: 'error' });
            OU.AppFramework.AriaHelper.UpdateNotifications();
        }

        function addErrorStyles(form) {
            form.find('.int-row').each(function () {
                if ($(this).find('span.field-validation-error').length > 0) {
                    $(this).addClass('int-error');
                    $(this).find('span.field-validation-error').each(function () {
                        $(this).addClass('int-errorMessage');
                    });
                }
            });
        }

        return {
            ApplyValidationStyles: function (context) {
                applyValidation(context);
            },
            CalculatePageControlBarHeight: function() {
                calculatePageControlBarHeight();
            }
        };
    };

    appFramework.Aria = function () {

        var aria = {
            //N.B. you can pass the arguments in two ways:     aria.hidden('div'); or aria.hidden($('div'));, either way would work
            checked: function (a) {
                if ($(a).is(':checked') == true) {
                    $(a).attr('aria-checked', 'true');
                } else {
                    $(a).attr('aria-checked', 'false');
                }
            },//aria-checked       
            disabled: function (a) {
                if ($(a).is('[disabled]')) {
                    $(a).attr('aria-disabled', 'true');
                } else {
                    $(a).attr('aria-disabled', 'false');
                }
            },//aria-disabled       
            expanded: function (a) {
                if ($(a).is(':visible') == true) {
                    $(a).attr('aria-expanded', 'true');
                } else {
                    $(a).attr('aria-expanded', 'false');
                }
            },//aria-expanded      
            expandedHidden: function (a) {
                if ($(a).is(':visible') == true) {
                    $(a).attr('aria-expanded', 'true').attr('aria-hidden', 'false');
                } else {
                    $(a).attr('aria-expanded', 'false').attr('aria-hidden', 'true');
                }
            },//aria-expanded and aria-hidden    
            hidden: function (a) {
                if ($(a).is(':visible') == false) {
                    $(a).attr('aria-hidden', 'true');
                } else {
                    $(a).attr('aria-hidden', 'false');
                }
            },//aria-hidden
            // Widget Attributes
            widgetAttribute: {
                live: {
                    polite: function (a) {
                        if (a === undefined) a = $('.int-note');
                        $(a).attr('aria-live', 'polite');
                    },
                    assertive: function (a) {
                        if (a === undefined) a = $('.int-errorMessage');
                        $(a).attr('aria-live', 'assertive');
                    }
                }
            }
        };

        /*------------------------------------------------ Main Structure Roles ------------------------------------------------*/
        var main = {
            roles: function () {
                $('#int-content').attr('role', 'main');
                $('.int-primary, .int-secondary, .int-accordionNav').attr('role', 'navigation');
                $('#int-region1, #int-region2').attr('role', 'region');
                $('.int-controlBar').attr('role', 'toolbar');
            },
            skipToMainContent: function () {
                /*-----------------Skip to Main Content Links-----------------*/
                //http://terrillthompson.com/blog/161
                // add a click handler to all links 
                // that point to same-page targets (href="#...")		
                $("a[href^='#']").click(function () {
                    // get the href attribute of the internal link
                    // then strip the first character off it (#)
                    // leaving the corresponding id attribute
                    $("#" + $(this).attr("href").slice(1) + "")
                        // give that id focus (for browsers that didn't already do so)
                        .focus();
                    // add a highlight effect to that id (comment out if not using)			
                    //.effect("highlight", {}, 3000);
                });
                $('#int-content').attr('tabindex', '-1').css("outline", "0");
                $('#int-page').attr('tabindex', '-1').css("outline", "0"); //Removes orange outline in chrome on focus.
            },
        };

        /*------------------------------------------------ Buttons and Toggles ------------------------------------------------*/
        var buttons = {
            roles: function () { $('.int-button').attr('role', 'button'); },
            dropComponents: function () {
                /*-------------------Initialisation-------------------*/
                //Drop Menu
                var menuButton = $('.int-dropButton');
                var menu = $('.int-dropMenu');
                menu.menu().hide();
                //Drop Content
                var contentButton = $('.int-dropDivButton');
                var content = $('.int-dropDiv');
                content.hide();
                /*-------------------WAI-ARIA-------------------*/
                var aria = {
                    //aria-controls, aria-haspopup
                    attributes: function (trigger, popup) {
                        popup.uniqueId();
                        trigger.uniqueId().each(function () {
                            var id = $(this).next(popup).attr('id');
                            $(this).attr('aria-controls', id).attr('aria-haspopup', 'true');
                        });
                    },
                    //aria-expanded, aria-hidden
                    states: function (element) {
                        element.each(function () {
                            if ($(this).is(':visible')) {
                                $(this).attr('aria-hidden', 'false').attr('aria-expanded', 'true');
                            }
                            else {
                                $(this).attr('aria-hidden', 'true').attr('aria-expanded', 'false');
                            }
                        });
                    }
                }   //replaces global aria object
                aria.attributes(menuButton, menu);
                aria.attributes(contentButton, content);
                aria.states(menu);
                aria.states(content);

                /*-------------------Event Handlers-------------------*/
                //Drop Menu
                menuButton.each(function () {
                    var thisButton = $(this);
                    var thisMenu = thisButton.next('.int-dropMenu');

                    //Click Event
                    thisButton.click(function () {
                        if (!thisMenu.is(':visible')) {
                            menu.hide().not(thisMenu);              //hide all open menus that is not the next menu
                            content.hide();
                            thisMenu.show().position({              //show next menu
                                my: "left top+4",
                                at: "left bottom",
                                of: this,
                                collision: "flipfit"
                            });
                            aria.states(menu);
                            aria.states(content);
                        }
                        else {
                            thisMenu.hide();
                            aria.states(menu);
                        }
                        // Register a click outside the menu to close it
                        $(document).one("click", function () {
                            thisMenu.hide();
                            aria.states(menu);
                        });
                        // Make sure to return false here or the click registration
                        // above gets invoked.
                        return false;
                    });

                    //Mouse Leave Event
                    thisMenu.mouseleave(function () {
                        setTimeout(function () {
                            thisMenu.hide();
                            aria.states(menu);
                        }, 750);
                    });

                });

                //Drop Content
                contentButton.each(function () {
                    var thisButton = $(this);
                    var thisContent = thisButton.next('.int-dropDiv');

                    thisButton.click(function () {
                        if (!thisContent.is(':visible')) {
                            content.hide().not(thisContent);
                            menu.hide();
                            thisContent.show().width(thisContent.parent().width() - 50).css('margin-top', '.4em');           //thisContent.parent().width() is set inside the click function in case the window is resized between clicks. Thus each new show will resize based on the latest parent width calculation 
                            aria.states(content);
                            aria.states(menu);
                        }
                        else {
                            thisContent.hide();
                            aria.states(content);
                        }
                        // Register a click outside the content to close it
                        $(document).one("click", function () {
                            thisContent.hide();
                            aria.states(content);
                        });
                        // Make sure to return false here or the click registration
                        // above gets invoked.
                        return false;
                    });


                });

                //On Windows Resize
                $(window).resize(function () {
                    menu.hide();
                    aria.states(menu);
                    content.hide();
                    aria.states(content);
                });
            },
            contentToggler: function () {
                var content = $('.int-toggle');
                var trigger = $('.int-toggleTrigger');
                //aria-controls
                content.uniqueId();
                trigger.each(function () {
                    var id = $(this).next('.int-toggle').attr('id');
                    $(this).attr('aria-controls', id);
                });
                //toggle function
                content.hide();
                aria.expandedHidden(content); //This function call has to occur after the hide otherwise the attr would be inaccurrate
                content.prev('.int-toggleTrigger').on('click', function () {
                    $(this).next('.int-toggle').fadeToggle(0);
                    aria.expandedHidden($(this).next('.int-toggle'));
                });
            },         //Content Toggle
            moreInfo: function () {
                var content = $('.int-less');
                var trigger = $('.int-more');
                //aria-controls
                content.uniqueId();
                trigger.each(function () {
                    var id = $(this).next('.int-less').attr('id');
                    $(this).attr('aria-controls', id);
                });
                //toggle function
                content.hide();
                aria.expandedHidden(content); //This function call has to occur after the hide otherwise the attr would be inaccurrate
                /*For jQuery 1.9.1 */
                content.prev('.int-more').html('<i class="int-icon-plus"></i> More Info').each(function () {
                    var a = function () {
                    $(this).html('<i class="int-icon-minus"></i> Less Info').next('.int-less').fadeToggle(0);
                    aria.expandedHidden($(this).next('.int-less'));
                    }
                    var b = function () {
                    $(this).html('<i class="int-icon-plus"></i> More Info').next('.int-less').fadeToggle(0);
                    aria.expandedHidden($(this).next('.int-less'));
                    }
                    $(this).togglefn(a, b);
                });


            },              //More Info       
            toggleAllToggler: function () {
                var component = $('.int-toggler');
                var trigger = $('.int-toggler > h3');
                var content = $('.int-toggler > div');
                //aria roles
                component.attr('role', 'tablist');
                trigger.attr('role', 'tab');
                content.attr('role', 'tabpanel');
                //aria-controls
                content.uniqueId();
                trigger.each(function () {
                    var id = $(this).next('div').attr('id');
                    $(this).attr('aria-controls', id);
                });
                //aria-labelledby
                trigger.uniqueId();
                content.each(function () {
                    var id = $(this).prev('h3').attr('id');
                    $(this).attr('aria-labelledby', id);
                });

                //Changing Icons and aria - selected, aria - hidden, aria - expanded
                trigger.prepend('<i></i> ');
                var checkState = function () {
                    var activeContent = $('.int-toggler > div.int-togglerContentActive');
                    var hiddenContent = $('.int-toggler > div').not('.int-togglerContentActive');
                    //Chevron Icon States
                    activeContent.prev('h3').addClass('int-togglerHeadActive').children('i').addClass('int-icon-chevron-down').removeClass('int-icon-chevron-right');
                    hiddenContent.prev('h3').removeClass('int-togglerHeadActive').children('i').addClass('int-icon-chevron-right').removeClass('int-icon-chevron-down');
                    //Content Expanded and Hidden States
                    activeContent.attr('aria-expanded', 'true').attr('aria-hidden', 'false');
                    hiddenContent.attr('aria-expanded', 'false').attr('aria-hidden', 'true');
                    //Trigger Selected States
                    var selected = $('.int-toggler > h3.int-togglerHeadActive'); //Note, this variable is defined here as it is changed by the chveron icon states statements
                    var unselected = $('.int-toggler > h3').not('.int-togglerHeadActive');
                    selected.attr('aria-selected', 'true');
                    unselected.attr('aria-selected', 'false');
                };
                checkState();

                //Click handler to toggle individual togglers
                trigger.on('click', function () {
                    $(this).next('div').toggleClass('int-togglerContentActive');
                    checkState();
                });

                //Show/Hide All for next instance of the toggler
                /*For jQuery 1.9.1 */
                $('.int-showToggler').each(function () {
                    var a = function () {
                    $(this).next('.int-toggler').children('div').addClass('int-togglerContentActive');
                    checkState();
                    }
                    var b = function () {
                    $(this).next('.int-toggler').children('div').removeClass('int-togglerContentActive');
                    checkState();
                    }
                    $(this).togglefn(a, b);
                });


                //aria-controls for show/hide for next instance of the toggler
                $('.int-toggler').uniqueId();
                $('.int-showToggler').each(function () {
                    var nextTogglerDivIDs = $(this).next('.int-toggler').children('div').map(function () {
                        return this.id;
                    }).get().join(" ");
                    $(this).attr('aria-controls', nextTogglerDivIDs);
                });

                //Show/Hide All for all instances of the toggler 
                /*For jQuery 1.9.1 */
                $('.int-showAllToggler').each(function () {
                    var a = function () {
                        $('.int-toggler > h3 + div').addClass('int-togglerContentActive');
                    checkState();
                    }
                    var b = function () {
                        $('.int-toggler > h3 + div').removeClass('int-togglerContentActive');
                    checkState();
                    }
                    $(this).togglefn(a, b);
                });
                //aria-controls for show/hide for all instance of the toggler
                var allTogglerDivIDs = $('.int-toggler > h3 + div').map(function() {
                    return this.id;
                }).get().join(" ");
                $('.int-showAllToggler').attr('aria-controls', allTogglerDivIDs);
            },     //Toggle All Toggler
        };

        /*------------------------------------------------ Forms ------------------------------------------------*/
        var forms = {
            checkbox: function () { //N.B. this only needs to be called once as the function checks for changes to checkboxes
                var a = $('input[type="checkbox"]');
                a.attr('role', 'checkbox'); //set role
                aria.checked(a); //determine initial checked state
                $(a).change(function () {
                    aria.checked($(this));
                });
                //aria-labelledby when in grids
                $('.int-checkboxGroup').each(function () {
                    var label = $(this).prev().children('label');
                    if (label.doesExist()) {
                        setLabelledBy(label, this);
                    } else {
                        label = $(this).prev();
                        if (label.doesExist() && label.prop("tagName").toLowerCase() === "label") {
                            setLabelledBy(label, this);
                        }
                    }
                });

                function setLabelledBy(label, el) {
                        label.uniqueId();
                        var id = label.attr('id');
                    $(el).attr('aria-labelledby', id);
                    }
            },
            radio: function () { //N.B. this only needs to be called once as the function checks for changes to radio buttons
                $('.int-radioGroup').attr('role', 'radiogroup');
                var a = $('input[type="radio"]');
                a.attr('role', 'radio');
                aria.checked(a); //determine initial checked state
                //Radio Buttons
                $(a).change(function () {
                    aria.checked($(this)); //determine checked state on changed radio
                    var x = $(this).attr('name');
                    aria.checked($('input[name="' + x + '"]').not(this)); //$(this).closest('.int-radioGroup').find('input[name="' + x + '"]').not(this)
                    //Finds all the inputs with the same name that is not the current radio and passes it to the ariaChecked function
                    //Rationale: for radio buttons, change() is only called when you check a radio button not when a radio button is unchecked so the aria-checked true 
                    //is not removed for previously checked radio buttons. For each change, the ariaChecked() has to be called twice: for newly checked radio the other radio buttons in the group.
                });
                //aria-labelledby when in grids
                $('.int-radioGroup').each(function () {
                    var label = $(this).prev().children('label');
                    if (label.doesExist()) {
                        label.uniqueId();
                        var id = label.attr('id');
                        $(this).attr('aria-labelledby', id);
                    }
                });
            },
            radioSwitch: function () {
                $('.int-slideButton').attr('role', 'presentation'); //Sliding bar for radio switch for presentation only. 
                $('.int-radioSwitch input[type="radio"]:first').prop('checked', true); //Ensures that the the default for radio switch is always checked at the start
                aria.checked($('.int-radioSwitch input[type="radio"]:first')); //Updates aria.checked()
            },
            checkAll: function () {
                var checkAllCheckbox = $('.int-checkAll');
                //aria-controls
                checkAllCheckbox.each(function () {
                    var name = $(this).attr('name');
                    $(this).attr('aria-controls', name);
                });
                //click fn for checkall checkbox
                checkAllCheckbox.on('click', function() {
                    var name = $(this).attr('name');
                    var checkboxGroup = $('input[type="checkbox"][name=' + name + ']');
                    checkboxGroup.prop('checked', this.checked);
                    aria.checked(checkboxGroup);
                });
            },
            help: function () {
                var helpMessage = $('.int-helpDesc');
                var trigger = $('.int-help');
                //roles
                trigger.attr('role', 'button');
                //aria-controls
                helpMessage.uniqueId();
                trigger.each(function () {
                    var id = $(this).parents().eq(2).children('.int-helpDesc').attr('id');
                    $(this).attr('aria-controls', id);
                });
                helpMessage.hide();
                //aria-expanded, aria-hidden, aria-live
                aria.widgetAttribute.live.polite(helpMessage);
                aria.expandedHidden(helpMessage);
                //click fn
                trigger.on('click', function () {
                    helpMessage.slideUp(150).attr('aria-expanded', 'false').attr('aria-hidden', 'true'); //Close all open descriptions
                    if ($(this).parents().eq(2).children('.int-helpDesc').is(':visible') == false) { //If the next description is not open, then open it
                        $(this).parents().eq(2).children('.int-helpDesc').slideDown(150);
                        aria.expandedHidden($(this).parents().eq(2).children('.int-helpDesc'));
                    }
                });
            },
            input: {
                prefix: function () {
                    //for pre fixes with a span, the input displays aria-describedby with the id of the span that is prepended to the input.
                    var description = $('.int-inputPrepend').has('span').children('span');
                    description.uniqueId();
                    description.each(function () {
                        var descriptionId = $(this).attr('id');
                        $(this).parent().children('input').attr('aria-labelledby', descriptionId);
                    });
                },
                postfix: function () {
                    //For post fixes with buttons, the buttons display aria-controls and the id of the input
                    var trigger = $('.int-inputAppend').has('a.int-button').children('a.int-button');
                    $('.int-inputAppend').children('input').uniqueId(); //Just incase an ID has not been hardcoded for the input
                    trigger.each(function () {
                        var inputId = $(this).parent().children('input').attr('id');
                        $(this).attr('aria-controls', inputId);
                    });
                    //for post fixes with a span, the input displays aria-describedby with the id of the span that is appended to the input.
                    var description = $('.int-inputAppend').has('span').children('span');
                    description.uniqueId();
                    description.each(function () {
                        var descriptionId = $(this).attr('id');
                        $(this).parent().children('input').attr('aria-describedby', descriptionId);
                    });
                },
                group: function () { //aria-labelledby for multiple inline inputs
                    $('.int-inputGroup').each(function () {
                        var label = $(this).children().children('label');
                        if (label.doesExist()) {
                            label.uniqueId();
                            var id = label.attr('id');
                            $(this).attr('aria-labelledby', id);
                        }
                    });
                },
            },
            rolesAndAttributes: function () {
                //roles
                $('form').attr('role', 'form');
                $('.int-errorMessage').attr('role', 'alert');
                $('input[type="text"], textarea').attr('role', 'textbox');
                $('.int-checkToggle p, .int-checkToggle span').attr('role', 'presentation'); //for checkswitches
                //attributes
                $('textarea[rows]').attr('aria-multiline', 'true');
                $('[disabled]').attr('aria-disabled', 'true');
                $('[readonly]').attr('aria-readonly', 'true');
                $('[required]').attr('aria-required', 'true');
                $('.int-required, .int-requiredAsterisk').attr('role', 'presentation');
                aria.widgetAttribute.live.assertive($('.int-errorMessage'));
            },
            listbox: function () {
                /*AToB BToA controls*/
                $('.int-listboxWidget .int-listboxWidgetAToB').click(function () {
                    var selectA = $(this).parent().parent().prev('select');
                    var selectB = $(this).parent().parent().next('select');
                    selectA.children(':selected').appendTo(selectB);
                });
                $('.int-listboxWidget .int-listboxWidgetBToA').click(function () {
                    var selectA = $(this).parent().parent().prev('select');
                    var selectB = $(this).parent().parent().next('select');
                    selectB.children(':selected').appendTo(selectA);
                });
                /*Up Down controls*/
                $('.int-listboxWidget .option-move-up').click(function () {
                    var selectB = $(this).parent().parent().prev('select');
                    selectB.children(':selected').each(function () {
                        $(this).insertBefore($(this).prev());
                    });
                });
                $('.int-listboxWidget .option-move-down').click(function () {
                    var selectB = $(this).parent().parent().prev('select');
                    selectB.children(':selected').each(function () {
                        $(this).insertAfter($(this).next());
                    });
                });
                /*Select all buttons*/
                $('.int-listboxWidgetSelectAllA').click(function () {
                    var optionsA = $(this).closest('.int-listboxWidgetExtras').next('select').children('option');
                    optionsA.attr('selected', 'selected');
                });
                $('.int-listboxWidgetSelectAllB').click(function () {
                    var optionsB = $(this).closest('.int-listboxWidgetExtras').nextAll().eq(2).children('option');
                    optionsB.attr('selected', 'selected');
                });
                /* WAI-ARIA*/
                $('.int-listboxWidget select').uniqueId();
                $('.int-listboxWidgetSelectAllA').each(function () {
                    var ID = $(this).closest('.int-listboxWidgetExtras').next('select').attr('id');
                    $(this).attr('aria-controls', ID);
                });
                $('.int-listboxWidgetSelectAllB').each(function () {
                    var ID = $(this).closest('.int-listboxWidgetExtras').nextAll().eq(2).attr('id');
                    $(this).attr('aria-controls', ID);
                });
                $('.int-listboxWidgetAToB').each(function () {
                    var ID = $(this).parent().parent().prev('select').attr('id');
                    $(this).attr('aria-controls', ID);
                });
                $('.int-listboxWidgetBToA').each(function () {
                    var ID = $(this).parent().parent().next('select').attr('id');
                    $(this).attr('aria-controls', ID);
                });
                $('.option-move-up, .option-move-down').each(function () {
                    var ID = $(this).parent().parent().prev('select').attr('id');
                    $(this).attr('aria-controls', ID);
                });
            },
            switchButtons: function () {
                function tabindex() {
                    inputs.each(function () {
                        if ($(this).next('label').hasClass('int-selected')) {
                            $(this).attr('tabindex', '-1');
                        } else {
                            $(this).attr('tabindex', '0');
                        }
                    });
                }
                function checkboxOnChange (a) {
                    $(a).change(function () {
                        var thisCheckbox = $(this);
                        var ID = $(this).attr('id');
                        var label = $('[for="'+ ID  +'"]');
                   
                        if (thisCheckbox.is(':checked')) {
                            label.addClass('int-selected').attr('aria-selected', 'true');
                        } else {
                            label.removeClass('int-selected').attr('aria-selected', 'false');
                        }
                    });
                };
                function checkSelectedLabel(input) {
                    $(input).each(function () {
                        var thisInput = $(this);
                        var inputID = thisInput.attr('id');
                        var thisLabel = $('[for="' + inputID + '"]');                       //The label for which the for attribute equals the ID of the input

                        if (thisLabel.hasClass('int-selected')) {                           //check initial state of labels
                            thisInput.prop('checked', true).attr('aria-checked', 'true');   //if int-selected is applied, then check the input
                            thisLabel.attr('aria-selected', true);                          //Set aria-selected
                        } else {
                            thisLabel.attr('aria-selected', false);
                        }
                    });
                };
                function init(buttonType, g, i, l, role) {
                    this.group = $(g);
                    this.inputs = $(i);
                    this.labels = $(l);

                    if (role.length > 0) {
                        group.attr('role', role);
                    }
                    inputs.uniqueId().each(function () {
                        var thisInput = $(this);
                        var thisLabel = thisInput.next('label');
                        var inputID = thisInput.attr('id');
                        thisInput
                            .addClass('int-hide')                                         //hide inputs
                            .attr('aria-hidden', 'true')                                    //set aria-hidden
                            .next('label').attr('for', inputID);                            //set for label
                        checkSelectedLabel(this);
                    });

                    /*Event Handler For Checkboxes*/
                    if (buttonType == 'checkbox') {
                        checkboxOnChange(i);
                    }

                    /* Event Handler for Radio*/
                    tabindex()
                    if (buttonType == 'radio') {
                        inputs.click(function () {
                            var thisRadio = $(this);
                            var thisLabel = thisRadio.next('label');
                            var name = $(this).attr('name');

                            labels.removeClass('int-selected').attr('aria-selected', 'false');
                            thisLabel.addClass('int-selected').attr('aria-selected', 'true');
                            tabindex();
                            aria.checked($('input[type="radio"][name="' + name + '"]').not(this));
                        });
                    }

                };
                //Grouped Checkbox Buttons
                init('checkbox', '.int-checkboxSwitchButtons', '.int-checkboxSwitchButtons > input:checkbox', '.int-checkboxSwitchButtons > label', '');
                //Grouped Radio Buttons
                init('radio', '.int-radioSwitchButtons', '.int-radioSwitchButtons > input:radio', '.int-radioSwitchButtons > label', 'radiogroup');
                //Single Checkbox Buttons Instances
                checkSelectedLabel('.int-checkboxButton');      //Check initial selected state
                checkboxOnChange('.int-checkboxButton');        //Set event handler function for .int-checkboxButton
            },
        };

        /*------------------------------------------------ Navigation ------------------------------------------------*/
        var navigation = {
            breadcrumb: function () {
                $('.int-breadcrumb').attr('role', 'navigation');
                $('.int-breadcrumb li').attr('role', 'presentation');
                $('.int-breadcrumb li.int-active a').attr('aria-pressed', 'true').attr('aria-disabled', 'true').click(function (event) {
                    event.preventDefault(); //prevents click event of active breadcrumb
                });
                $('.int-breadcrumb li:not(.int-active) a').attr('aria-pressed', 'false').attr('aria-disabled', 'false');
            },
            jumplinks: function () {
                $('.int-jumpLinks').attr('role', 'navigation');
                $('.int-jumpLinks li').attr('role', 'presentation');
            },
            pagination: function () {
                $('.int-pagination').attr('role', 'navigation');
                $('.int-pagination ul li').attr('role', 'presentation');
                $('.int-pagination ul li a').attr('role', 'button');
                $('.int-pagination ul li.int-active a').attr('aria-pressed', 'true');
                $('.int-pagination ul li:not(.int-active) a').attr('aria-pressed', 'false');
                $('.int-pagination ul li.int-disabled a').attr('aria-disabled', 'true');
                $('.int-pagination ul li:not(.int-disabled) a').attr('aria-disabled', 'false');
            },
        };

        /*------------------------------------------------ Notifications ------------------------------------------------*/
        var notification = {
            alerts: function () {
                $('.int-alert').attr('role', 'alert').attr('aria-live', 'polite');
                $('.int-error').attr('aria-live', 'assertive');
                $('.int-alert:hidden').removeAttr('aria-live');
                aria.expandedHidden($('.int-alert'));
                var closeButton = $('.int-alert').children('a.int-alertClose');
                closeButton.attr('role', 'button');
                closeButton.on('click', function () { //Set on to events i.e. click, to so new items can be dynamically added to the dom. Attaches event handlers dynamically to the the selector and the event, not just the selector. 
                    var a = $(this).parent('.int-alert');
                    $(this).fadeOut(0); //Fadeout has to be zero for aria to work
                    a.fadeOut(0);
                    aria.expandedHidden(a);
                    $('.int-alert:hidden').removeAttr('aria-live'); //removes the live attribute from the hidden alert
                });
            },
            tooltips: function () {
                $('[title]').tipsy({ gravity: $.fn.tipsy.autoNS }); //Tipsy tooltip function call
                $('.int-tooltipW').attr('title', 'Show/hide sidebar').tipsy({ gravity: 'w' }); //this has to be called separately as the default tooltip position obscures the text.
            }
        };

        /*------------------------------------------------ Tables ------------------------------------------------*/
        var tables = {
            sortable: function () {
                $(".int-sortableTable thead tr th").append('<a href="#" role="button"></a>');
                $(".int-sortableTable").tablesorter();
            },  //Sortable tables
            expandable: function () {
                //Expanding Nested Tables
                var mainTable = $('.int-expandingTable');
                var childTable = $('.int-childTable');
                childTable.prev('tr').addClass('int-parent'); //Adds in-parent class to the previous tr element.     
                var triggerRow = $('.int-parent');
                childTable.hide();

                //Initial Row Icons state
                triggerRow.children(':first-child').prepend('<i class="int-icon-caret-right" role="presentation"><a href="#"></a></i>&nbsp;');

                //aria roles
                mainTable.attr('role', 'tablist');
                childTable.attr('role', 'tabpanel');
                triggerRow.attr('role', 'tab');
                triggerRow.children(':first-child').children('i').children('a').attr('role', 'button');
                //aria-controls
                childTable.uniqueId();
                triggerRow.each(function () {
                    var id = $(this).next(childTable).attr('id');
                    $(this).attr('aria-controls', id);
                    $(this).children(':first-child').children('i').children('a').attr('aria-controls', id);
                });
                //aria-expanded and aria-hidden          
                aria.expandedHidden(childTable); //this has to be below the hide function for child tables.
                //aria-selected
                var selected = function () {
                    $('.int-parent').each(function () {
                        if ($(this).hasClass('int-selected') == true) {
                            $(this).attr('aria-selected', 'true');
                        } else {
                            $(this).attr('aria-selected', 'false');
                        }
                    });
                };
                selected(); //check initial selected state

                //Toggle individual child tables                                   
                $('table').on('click', 'tr.int-parent', function () { //Hooks event handler up to the table instead of the individual row, the event will bubble up to the table and the second parameter is a selector for that event.
                    $(this).toggleClass('int-selected').next('.int-childTable').fadeToggle(0); //This allows dynamically adding rows without the need to re-hook event handlers, and lower overheads when there are many tr.int-parents
                    $(this).children(':first-child').children('i').toggleClass('int-icon-caret-right').toggleClass('int-icon-caret-down');
                    aria.expandedHidden($(this).next('.int-childTable'));
                    selected();
                });

                //Toggle All Tables
                var triggerAll = $('.int-expandCollapseAll');

                //aria-controls
                var allChildTablesId = childTable.map(function () {
                    return this.id;
                }).get().join(" ");
                triggerAll.attr('aria-controls', allChildTablesId);
                triggerAll.prepend('<i class="int-icon-plus" role="presentation"></i> Expand all tables');
                /*For jQuery 1.9.1 */
                triggerAll.each(function () {
                    var A = function () {
                    $(this).html('<i class="int-icon-minus"></i> Collapse all tables');
                    childTable.show();
                    triggerRow.addClass('int-selected').children(':first-child').children('i').removeClass('int-icon-caret-right').addClass('int-icon-caret-down');
                    aria.expandedHidden(childTable);
                    selected();
                    }
                    var B = function () {
                    $(this).html('<i class="int-icon-plus"></i> Expand all tables');
                    childTable.hide();
                    triggerRow.removeClass('int-selected').children(':first-child').children('i').removeClass('int-icon-caret-down').addClass(' int-icon-caret-right');
                    aria.expandedHidden(childTable);
                    selected();
                    }
                    $(this).togglefn(A, B);
                });
            },//Expandable nested tables
            datatables: {
                showEntries: function () {
                    var displayLengthArray = new Array();

                    $('.int-datatables').each(function () {
                        var uniqueId = $(this).attr('id');
                        displayLengthArray[uniqueId] = "10";
                        var uniqueIdShowEntries = $('#' + uniqueId + '_length');
                        var select = $('#' + uniqueId + '_length label select');
                        var options = $('#' + uniqueId + '_length label select option');

                        uniqueIdShowEntries.children("label").html("Show entries");
                        uniqueIdShowEntries.append(select);
                        $('#' + uniqueId + '_length select').attr("id", uniqueId + "_select");

                        $(options).each(function () {
                            $('#' + uniqueId + '_select').append(this);
                        });

                        $(document).on("click", '#' + uniqueId + '_select', function () {
                            var originalTableId = $(this).attr('id');
                            originalTableId = originalTableId.substring(0, originalTableId.length - 7);
                            if ($(this).val() != displayLengthArray[originalTableId]) {
                                displayLengthArray[originalTableId] = $(this).val();
                                var oTable = $('#' + originalTableId).dataTable();
                                var oSettings = oTable.fnSettings();
                                oSettings._iDisplayLength = parseInt($(this).val());
                                oTable.fnPageChange("first");
                            }
                        });
                    });
                }   //removes show entries' select and appends it to after the label. Has to be called after the function call for datatables. 
            },
        };

        /*------------------------------------------------ Typography ------------------------------------------------*/
        var typography = function () {
            //roles
            $('ul.int-bulletList, ol.int-numberedList').attr('role', 'list');
            $('ul.int-bulletList li, ol.int-numberedList li').attr('role', 'listitem');
            $('i[class*="int-icon"], hr, int-vantageLogo').attr('role', 'presentation');
            $('.int-note').attr('role', 'note');
            //attributes
            $('.int-note').attr('aria-live', 'polite');
        };
        var updateAll = function () {
            updateMain();
            updateButtons();
            updateForms();
            updateNavigation();
            updateNotifications();
            updateTables();
            updateTypography();
            $('input, textarea').formtips({
                tippedClass: 'tipped'
            });
        };
        var updateMain = function () {
            main.roles();
            main.skipToMainContent();
        };
        var updateButtons = function () {
            buttons.roles();
            buttons.dropComponents();
            buttons.contentToggler();
            buttons.moreInfo();
            buttons.toggleAllToggler();
        };
        var updateForms = function () {
            forms.checkbox();
            forms.radio();
            forms.radioSwitch();
            forms.checkAll();
            forms.help();
            forms.input.postfix();
            forms.input.prefix();
            forms.input.group();
            forms.rolesAndAttributes();
            forms.listbox();
            forms.switchButtons();
        };
        var updateNavigation = function () {
            navigation.breadcrumb();
            navigation.jumplinks();
            navigation.pagination();
        };
        var updateNotifications = function () {
            notification.alerts();
            notification.tooltips();
        };
        var updateTables = function () {
            tables.sortable();
            tables.expandable();
        };
        var updateDatatables = function () {
            tables.datatables.showEntries();
        };
        var updateTypography = function () {
            typography();
        };

        return {
            UpdateAll: function () {
                updateAll();
            },
            UpdateMain: function () {
                updateMain();
            },
            UpdateButtons: function () {
                updateButtons();
            },
            UpdateForms: function () {
                updateForms();
            },
            UpdateNavigation: function () {
                updateNavigation();
            },
            UpdateNotifications: function () {
                updateNotifications();
            },
            UpdateTables: function () {
                updateTables();
            },
            UpdateDatatables: function () {
                updateDatatables();
            },
            UpdateTypography: function () {
                updateTypography();
            }
        };
    };
})(jQuery, OU.AppFramework);

OU.AppFramework.UtilityHelper = new OU.AppFramework.Utility();
OU.AppFramework.AriaHelper = new OU.AppFramework.Aria();