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
Set up your presentation by using a jQuery selector to select the class of the slides
<pre>
$(function()    {
    $('.slide').presentr({
        speed: 500,
        pageDisplay: $('#slideinfo'),
        hashJump: true,
        hashPrefix: 'slide'
    });
});
</pre>
# Options
* ``speed``: speed in ms of slide changes (default: 1000)
* ``pageDisplay``: set this to the jQuery object(s) you'd like to update with frame info (default: null)
* ``hashJump``: if you want the slides to update the URL and able to be linked to and snap (default: true)
* ``hashPrefix``: string that proceeds the slide in the hash (default: 'slide')

# Features
* Page Display: Specifying a ``pageDisplay`` jQuery object replaces the HTML of that object with the current slide number out of the total number of slides. Check out the [demo](http://www.jsantell.com/presentr) and see the big pink box in the upper right?
* Slide Jump: Setting ``hashJump`` to true will update the URL with a hash on every slide event. The prefix can be changed by setting ``hashPrefix`` to the string you'd like to use. Copy and pasting the URL with the hash will jump right to the slide.

# Compatability

* Tested in jQuery 1.2.3 - 1.6.2
* Works in legit browsers. Even non-legit browsers like IE7. Does not work in IE6. The JS works as far as I know, but if anyone wants to fuck with the animate CSS, fork the shit out of this.

# License
The MIT License, Copyright &copy; 2011 Jordan Santell -- Collab, progress, victory
