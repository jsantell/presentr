/* presentr v1.0
 * jQuery Plugin for Presentations
 * 
 * Tested on jQuery 1.2.3 - 1.6.2
 *
 * The MIT License, Copyright (c) 2011 Jordan Santell, 
 * http://github.com/jsantell/presentr
 */

(function($)    {


    $.fn.presentr = function(userSettings)  {


        // Set up parameters and members
        var options = $.extend({}, $.fn.presentr.defaults, userSettings),
            ableToSlide = true,
            ArrowKey = {
                left : 37,
                right : 39
            },
            currentSlide = 1,
            Direction = {
                left : 0,
                right : 1        
            },
            docLoc = document.location,
            PARSE_HASH = /(#[^ ]*)/,
            PARSE_CURRENTSLIDE = new RegExp('#'+options.hashPrefix+'([0-9]+)'),
            screenWidth = $(window).width(),
            slides = this,
            timeout = null,
            totalSlides = 0;
        $('body').css('overflow','hidden');


        // Updating page display
        var updatePageDisplay = function()  {
            if(options.pageDisplay !== null)    {
                options.pageDisplay.html(currentSlide+'/'+totalSlides);
            }
        }


        var updateHashURL = function()  {
            if(options.hashJump)    {
                if(docLoc.hash)    {
                    var newHash = '#' + options.hashPrefix + currentSlide;
                    docLoc.href = docLoc.href.replace(PARSE_HASH, newHash);
                }
                else    {
                    docLoc.href += '#' + options.hashPrefix + currentSlide;    
                }
            }

        }

    
        // Event called when change slide input received
        var traverseSlideEvent = function(e)  {
            if(ableToSlide === true
                && ((e.keyCode === ArrowKey.right && currentSlide < totalSlides)
                || ( e.keyCode === ArrowKey.left  && currentSlide > 1)))   {
                   controlDelay();
                   changeSlide((e.keyCode === ArrowKey.right) ? Direction.right : Direction.left);
            }
        };


        // Animates slide change forward or backwards
        var changeSlide = function(direction)  {
            screenWidth = $(window).width();
            slides.each(function()    {
                var shiftDirection = (direction === Direction.right) ? -1 : 1,
                    obj = $(this);
                currentPosition = obj.css('left');
                newPosition = parseInt(currentPosition) + (screenWidth * shiftDirection);
                obj.animate({
                  left: newPosition
                }, options.speed, 'swing');
            });
            (direction === Direction.right) ? currentSlide++ : currentSlide--;
            updateHashURL();
            updatePageDisplay();
        };
        

        // Binds events handlers
        var setArrowEvents = function()  {
            window.addEventListener('keydown', traverseSlideEvent, true);
        };


        // If arrows are set to true (default), bind slide change to arrow keys
        if(options.arrows === true) {
            setArrowEvents();
        }

  
        // Set delay (speed+100) to limit slide spam
        var controlDelay = function()    {
            ableToSlide = false;
            if(timeout) {
                clearTimeout(timeout);
            }
            timeout = window.setTimeout(function () {
                ableToSlide = true;
            }, options.speed+100);
        };                  


        // If hash URL true and specified, jump to slide
        var slideJump = function()  {
            if(options.hashJump && PARSE_CURRENTSLIDE.test(docLoc.href))    {
                var slideFromHash = docLoc.href.match(PARSE_CURRENTSLIDE)[1];
                if(typeof currentSlide === 'number')    {
                    currentSlide = slideFromHash;
                }
            }
        }
    

        // Set up positions of slides
        var initialize = function(selectedObjects) {

            // Update currentSlide if hash found
            slideJump();
            
            // Set up CSS for the slides
            return selectedObjects.each(function() {
                totalSlides++;
                var obj = $(this),
                    margin = (screenWidth - parseInt(obj.css('width'))) / 2;
                    currentDiff = (currentSlide - totalSlides) * (-1);
                    position  = (currentDiff * screenWidth) + margin;
                obj.css('float','left');
                obj.css('display','block');
                obj.css('position','fixed');
                obj.css('left',position);
                updatePageDisplay();
            });
        };
        

        return initialize(this);


    };

    
    $.fn.presentr.defaults = {
        speed : 1000,
        arrows : true,
        hashJump : true,
        hashPrefix : 'slide',
        pageDisplay : null
    };


})(jQuery);

