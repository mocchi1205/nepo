/*!
 * nepo 1.0.0
 * Nepo, is a phone number checker for Nepali developers which helps to detect the number belongs to nepal sim company.
 *
 * Created by FortranCoder
 *
 * @license MIT
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery) {
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
    "use strict";

    // Default Options
    var defaults = {
        // TODO: ADD YOUR DEFAULT OPTIONS HERE
        myStyle: 'my-style1'
    };

    class Nepo {

        constructor(element, options) {
            // Merge user settings with default
            this.options = $.extend(true, {}, defaults, options);

            // Main container element
            this.main = $(element);

            // Initial load
            this._init();

            // only 10 digit number
            this._getOnly10Digit();

            //only numeric (0-9) in HTML
            this._ForceNumericOnly();

            

        }

        // Initial Method
        _init() {

            /**
             * Plugin init and logic
             * ncell - ncell number
             */
            const ncell = ['980', '981', '982'];
            /**
             * namaste - namaste number
             */
            const namaste = ['984', '985', '986'];
            /**
             * sky - nepal telecom 
             */
            const sky = ['974', '975'];
            /**
             * smart - smart cell
             */
            const smart = ['961', '988'];
            /**
             * Utl - utl cell
             */
            const utl = ['972'];
            /**
             * 10 digit number - 10 digit number
             * valid_type - valid type
             */
            const nepoDigit = /^[0-9]{10}$/;

            /**
             * Changeing array to regex string for matching purpose
             */
            const ncell_regex = new RegExp(ncell.join('|'));
            const namaste_regex = new RegExp(namaste.join('|'));
            const sky_regex = new RegExp(sky.join('|'));
            const smart_regex = new RegExp(smart.join('|'));
            const utl_regex = new RegExp(utl);


            this.main.on('keypress keydown keyup', function() {              
                        // createing new element for showing image
                        let img = $('#loader');
                        let p = $('p');
                        const url = 'https://cdn.esewa.com.np/products_logo/';
                        // get only 10 digit number
                        //checking for valid number
                    if (nepoDigit.test($(this).val()) === true) {
                       
                        //checking for ncell
                        if (ncell_regex.test($(this).val())) {
                            //statement for ncell
                            img.attr('src', url + 'ncell.png').removeClass('hidden'); 
                        }
                        //checking for namaste
                        else if (namaste_regex.test($(this).val())) {
                            //statement for namaste
                            img.attr('src', url + 'ntc.png').removeClass('hidden');
                        }
                        //checking for sky
                        else if (sky_regex.test($(this).val())) {
                            //statement for sky
                            img.attr('src', url + 'sky.png').removeClass('hidden');
                        }
                        //checking for smart
                        else if (smart_regex.test($(this).val())) {
                            //statement for smart
                            img.attr('src', url + 'smartcell.png').removeClass('hidden');

                        }
                        //checking for utl
                        else if (utl_regex.test($(this).val())) {
                            //statement for utl
                            img.attr('src', url + 'utl.png').removeClass('hidden');
                        }

                        

                    } else {
                        //statement for invalid number
                        p.html('');
                        $('p').html('<p>Invalid Number</p>');
                    }


               
            });




        }
        // Force Numeric Only
        _ForceNumericOnly() {
            this.main.keydown(function(e) {
                let key = e.charCode || e.keyCode || 0;
                // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
                return (
                    key == 8 ||
                    key == 9 ||
                    key == 46 ||
                    (key >= 37 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105) ||
                    (e.ctrlKey && key == 97) || (e.ctrlKey && key == 65) || // Ctrl+a
                    (e.ctrlKey && key == 120) || (e.ctrlKey && key == 88) || // Ctrl+x
                    (e.ctrlKey && key == 99) || (e.ctrlKey && key == 67) || // Ctrl+c
                    (e.ctrlKey && key == 118) || (e.ctrlKey && key == 86) || // Ctrl+v
                    (e.ctrlKey && key == 122) || (e.ctrlKey && key == 90) ||  // Ctrl+z
                    (e.ctrlKey && key == 82) || (e.ctrlKey && key == 82)  // Ctrl+r
                    );
            });
        }

        //get only 10 digit number
        _getOnly10Digit() {
            this.main.keydown(function(e) {
                if ($(this).val().length === 10) {
                   //input only 10 digit number
                   let key = e.charCode || e.keyCode || 0;
                    // allow backspace, tab, delete, arrows 
                    return (
                        key == 8 || key == 9 || key == 46 || (key >= 37 && key <= 40) ||
                        (e.ctrlKey && key == 97) || (e.ctrlKey && key == 65) || // Ctrl+a
                        (e.ctrlKey && key == 120) || (e.ctrlKey && key == 88) || // Ctrl+x
                        (e.ctrlKey && key == 99) || (e.ctrlKey && key == 67) || // Ctrl+c
                        (e.ctrlKey && key == 118) || (e.ctrlKey && key == 86) || // Ctrl+v
                        (e.ctrlKey && key == 122) || (e.ctrlKey && key == 90) ||  // Ctrl+z
                        (e.ctrlKey && key == 82) || (e.ctrlKey && key == 82)  // Ctrl+r
                        );

                }
            });
        }


    }

    // Wrapper for the plugin
    $.fn.nepo = function(options) {
        var pluginName = "nepo";

        if (options === undefined || typeof options === 'object') {
            return this.each(function() {
                if (!$.data(this, pluginName)) {
                    $.data(this, pluginName, new Nepo(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            let instance = $.data(this[0], pluginName);

            if (options === 'destroy') {
                $.data(this, pluginName, null);
            }

            if (instance instanceof Nepo && typeof instance[options] === 'function') {
                return instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
            } else {
                return this;
            }
        }
    };
}));