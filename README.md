presentr: jQuery Plugin for Presentations
============================================================
# What
*presentr* is jQuery plugin designed to let you make a presentation in the browser fast.

[Live demo with usage info](http://jsantell.com/presentr), also check out included ``index.html``.

Start using it! Grab or fork it from here, or contact me (here on GitHub, [Twitter](http://www.twitter.com/jsantell), [my site](http://jsantell.com)) if you have any feedback!

# Usage
Include presentr in your head
<pre>
    &lt;script type='text/javascript' src='js/jquery.presentr.min.js'&gt;&lt;/script&gt;
</pre>
Create a jQuery object with the class of the slides and call the presentr method, passing in any (non-required) options:
<pre>
$(function()    {
    $('#slides').presentr({
        speed: 500,
        pageDisplay: $('#slideinfo'),
        hashJump: true,
        hashPrefix: 'slide'
    });
});
</pre>
# Options
* ``speed``: Speed in ms of slide changes (default: 1000)
* ``pageDisplay``: Set this to the jQuery collection you'd like to update with frame info (default: null)
* ``hashJump``: If you want the slides to update the URL and able to be linked to and snap (default: true)
* ``hashPrefix``: String that proceeds the slide in the hash (default: 'slide')
* ``slideFunctions``: Object that stores information on functions to be called during slide enter, exit, and during slides. More info in features.
* ``onSlide``: Callback function on slide change (default: noop)
* ``onSubslide``: Callback function on subslide change (default: noop)
* ``slideFunctions``: Object containing enter, exit and subslide functions. (default: {})
<pre>
    slideFunctions: {
        '4': {
            enter: function() { $('.slide4elements').hide(); },
            subslides: [
                function() { $('#bulletPoint1').fadeIn(); },                              
                function() { $('#bulletPoint2').fadeIn(); },                              
                function() { $('#bulletPoint3').fadeIn(); },                              
                function() { $('#codeSnippet').fadeIn(); }
            ],
            exit: function() { $('.slide4elements').hide(); }
        },
        '7': {
            enter: DEMOS.trig.start,
            exit: DEMOS.trig.stop
        }
    }              
</pre>

# Events
* ``slide.presentr``: This event is triggered on slide change
<pre>
    $('#slides').bind('slide.presentr', function(e, slide, direction) {
        ...
    });
</pre>
* ``subslide.presentr``: This event is triggered on subslide change
<pre>
    $('#slides').bind('subslide.presentr', function(e, slide) {
        ...
    });
</pre>

# Features
* Page Display: Specifying a ``pageDisplay`` jQuery object replaces the HTML of that object with the current slide number out of the total number of slides. Check out the [demo](http://www.jsantell.com/presentr) and see the big pink box in the upper right?
* Slide Jump: Setting ``hashJump`` to true will update the URL with a hash on every slide event. The prefix can be changed by setting ``hashPrefix`` to the string you'd like to use. Copy and pasting the URL with the hash will jump right to the slide.
* Slide Functions: ``slideFunctions`` is an object with slide numbers as its keys and objects with three available methods as its value: ``enter``, ``exit``, and ``subslides``. ``enter`` and ``exit`` accepts a function to be called when entering or exiting a slide, respectively, while ``subslides`` is an array of functions to be called sequentially when progressing through an individual slide. In the demo, slide 4 has four elements fading in, and hidden on enter and exit. Slide 7 starts the trig demo upon enter, and stops it upon exit.


# Compatability

* Tested in jQuery 1.2.3 - 1.6.2
* Works in legit browsers. Even non-legit browsers like IE7. Does not work in IE6. The JS works as far as I know, but if anyone wants to fuck with the animate CSS, fork the shit out of this.

# License
The MIT License, Copyright &copy; 2011 Jordan Santell -- Collab, progress, victory
