/* presentr v1.0
 * jQuery Plugin for Presentations
 * 
 * Tested on jQuery 1.2.3 - 1.6.2
 *
 * The MIT License, Copyright (c) 2011 Jordan Santell 
 * http://github.com/jsantell/presentr
 */

;(function ($) {

    $.fn.presentr = function ( userSettings ) {

        var options         = $.extend( $.fn.presentr.defaults, userSettings ),
            ableToSlide     = true,
            currentSlide    = 1,
            currentSubslide = 0,
            totalSlides     = 0,
            screenWidth     = $( window ).width(),
            $slideCntl      = this,
            $slides         = $slideCntl.children(),
            URL             = window.location,
            DIR = { LEFT: -1, RIGHT: 1 },
            KEY = { LEFT: 37, RIGHT: 39 };

        /* Events */

        function functionCalls( dir ) {
            var sFuncs    = options.slideFunctions,
                thisFuncs = sFuncs[ currentSlide ]       || {},
                nextFuncs = sFuncs[ currentSlide + dir ] || {},
                subslides = thisFuncs.subslides          || [];
            // If there are subslides, call the related functions if they exist
            if ( dir === DIR.RIGHT && currentSubslide < subslides.length &&
                    $.isFunction(subslides[ currentSubslide ]) ) {
                subslides[ currentSubslide ]();
                currentSubslide++;
                triggerSubslide();
            } else { // Go to new slide if no subslides
                if ( $.isFunction(thisFuncs.exit) ) { thisFuncs.exit(); }
                if ( $.isFunction(nextFuncs.enter) ) { nextFuncs.enter(); }
                animateSlide( dir );
            }
        }
        
        function triggerSlide( dir ) {
            $slideCntl.trigger( 'slide.presentr', [ currentSlide, dir ] );
            options.onSlide();
        }

        function triggerSubslide() {
            $slideCntl.trigger( 'subslide.presentr', [ currentSubslide ] );
            options.onSubslide();
        }
        
        /* Animation, Updates */

        function animateSlide( dir ) {
            if ( !ableToSlide ) { return false; }
            ableToSlide = false;
             $slides.each(function () {
                var $obj = $( this ),
                    currentPosition = parseInt( $obj.css( 'left' ), 10 ),
                    newPosition = currentPosition - ( screenWidth * dir );
    
                $obj.animate({
                    left: newPosition
                }, options.speed, 'swing', function () {
                    ableToSlide = true;
                });
            });
            currentSlide += dir;
            triggerSlide( dir );
            updatePage();
        }
        
        function updatePage() {
            var hash;
            if ( options.pageDisplay instanceof jQuery ) {
                options.pageDisplay.html( currentSlide + '/' + totalSlides );
            }
            if ( options.hashJump ) {
                hash = '#' + options.hashPrefix + currentSlide;
                URL.href = URL.hash ? URL.href.replace( /(#[^ ]*)/, hash ) : URL.href + hash;
            }
            currentSubslide = 0;
        }

        /* Initializers */

        function initHashJump() {
            var regex = new RegExp( '#' + options.hashPrefix + '([0-9]+)' ),
                parsedSlide = URL.href.match( regex );
            if ( parsedSlide && parsedSlide[ 1 ] <= $slides.length ) {
                currentSlide = ~~parsedSlide[ 1 ];
            }
        }

        function initArrowEvents() {
            $( document ).keydown(function ( e ) {
                var key = e.which === null ? e.keyCode : e.which;
                if (key === KEY.RIGHT && currentSlide < totalSlides) {
                    functionCalls( DIR.RIGHT );
                } else if ( key === KEY.LEFT && currentSlide > 1 ) {
                    functionCalls( DIR.LEFT );
                }
            });
        }

        return (function init() {
            var sFuncs = options.slideFunctions;
            if ( options.hashJump ) { initHashJump(); }
            if ( options.arrows ) { initArrowEvents(); }
            
            $( 'body' ).css( 'overflow-x', 'hidden' );
            
            $slides.each(function () {
                totalSlides++;
                var $obj = $( this ),
                    margins = screenWidth - parseInt( $obj.css( 'width' ), 10 ),
                    currentDiff = totalSlides - currentSlide,
                    position  = ( currentDiff * screenWidth ) + ( margins / 2 );
                
                $obj.css({
                    'display' : 'block',
                    'position': 'fixed',
                    'left'    : position
                });
            });

            updatePage();

            if ( sFuncs[ currentSlide ] && $.isFunction(sFuncs[ currentSlide ].enter) ) {
                sFuncs[ currentSlide ].enter();
            }
            return $slideCntl;
        }());
    };

    /* Public members */

    $.fn.presentr.defaults = {
        arrows        : true, // For future, non-keyboard inputs
        hashJump      : true,
        hashPrefix    : 'slide',
        onSlide       : function() { },
        onSubslide    : function() { },
        pageDisplay   : null,
        slideFunctions: {},
        speed         : 1000
    };

}( jQuery ));

