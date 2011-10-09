/* presentr v1.0
 * jQuery Plugin for Presentations
 * 
 * Tested on jQuery 1.2.3 - 1.6.2
 *
 * The MIT License, Copyright (c) 2011 Jordan Santell 
 * http://github.com/jsantell/presentr
 */

(function ($) {

    $.fn.presentr = function (userSettings) {

        var options = $.extend($.fn.presentr.defaults, userSettings),
            ableToSlide = true,
            ARROWKEY = {
                LEFT: 37,
                RIGHT: 39
            },
            currentSlide = 1,
            currentSubSlide = 0,
            DIRECTION = {
                LEFT: -1,
                RIGHT: 1        
            },
            docLoc = document.location,
            PARSE_CURRENTSLIDE = new RegExp('#' + options.hashPrefix +
                '([0-9]+)'),
            PARSE_HASH = /(#[^ ]*)/,
            screenWidth = $(window).width(),
            $slides = this,
            totalSlides = 0;

        /* Animation, Updates */        

        function functionCalls(direction) {
            var funcs = options.slideFunctions[currentSlide],
                nextFuncs = options.slideFunctions[currentSlide + direction] || {},
                enter = funcs ? funcs.start : null,
                exit = funcs ? funcs.exit :null,
                subslides = funcs ? funcs.subslides : [];
            // If there are subslides...
            if (direction === DIRECTION.RIGHT
                && subslides
                && currentSubSlide < subslides.length 
                && typeof subslides[currentSubSlide] === 'function') {
                subslides[currentSubSlide]();
                currentSubSlide += 1;
            } else { // Go to new slide if no subslides
                if (exit)
                    exit();
                if (nextFuncs.enter && typeof nextFuncs.enter === 'function')
                    nextFuncs.enter();
                animateSlide(direction);
            }
        }

        function animateSlide(direction) {
            if (!ableToSlide) return false;
            ableToSlide = false;
            $slides.each(function () {
                var $obj = $(this),
                    currentPosition = parseInt($obj.css('left'), 10),
                    newPosition = currentPosition - (screenWidth * direction);
    
                $obj.animate({
                    left: newPosition
                }, options.speed, 'swing', function () {
                    ableToSlide = true;
                });
            });
            currentSlide += direction;
            updatePage();
        }
        
        function updatePage() {
            if (options.pageDisplay instanceof jQuery) {
                options.pageDisplay.html(currentSlide + '/' + totalSlides);
            }
            if (options.hashJump) {
                var hash = '#' + (options.hashPrefix + '') + (currentSlide + '');
                docLoc.href = docLoc.hash
                    ? docLoc.href.replace(PARSE_HASH, hash)
                    : docLoc.href + hash;
            }
            currentSubSlide = 0;
        }


        /* Initializers */
        
        function initHashJump() {
            if (PARSE_CURRENTSLIDE.test(docLoc.href)) {
                var possibleSlide = ~~docLoc.href.match(PARSE_CURRENTSLIDE)[1];
                if (possibleSlide && possibleSlide <= $slides.length) {
                    currentSlide = possibleSlide;
                }
            }
        }

        function initArrowEvents() {
            $(document).keydown(function (e) {
                var key = e.which === null ? e.keyCode : e.which;
                if (key === ARROWKEY.RIGHT && currentSlide < totalSlides) {
                    functionCalls(DIRECTION.RIGHT);
                } else if (key === ARROWKEY.LEFT && currentSlide > 1) {
                    functionCalls(DIRECTION.LEFT);
                }
            });
        }

        return (function init($selectedObjects) {
            if (options.hashJump) initHashJump();
            if (options.arrows) initArrowEvents();
            
            $('body').css('overflow-x', 'hidden');
            
            $selectedObjects.each(function () {
                totalSlides++;
                var $obj = $(this),
                    margins = screenWidth - parseInt($obj.css('width'), 10),
                    currentDiff = (totalSlides - currentSlide),
                    position  = (currentDiff * screenWidth) + (margins / 2);
                
                $obj.css({
                    'display': 'block',
                    'position': 'fixed',
                    'left': position
                });
            });
            updatePage();
            if (options.slideFunctions[currentSlide]
                && typeof options.slideFunctions[currentSlide].enter === 'function')
                options.slideFunctions[currentSlide].enter();
            return $selectedObjects;
        }($slides));
        
    };

    /* Public members */

    $.fn.presentr.defaults = {
        speed : 1000,
        arrows : true, // For future, non-keyboard inputs
        hashJump : true,
        hashPrefix : 'slide',
        pageDisplay : null,
        slideFunctions: {}
    };

}(jQuery));

