presentr: jQuery Plugin for Presentations
============================================================

# Demo
[Live demo with usage info](http://jsantell.com/presentr), also check out included ``index.html``.

# Usage
Include presentr in your head
<pre>
<script type='text/javascript' src='js/jquery.presentr.min.js'></script>
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
* Page Display: Specifying a pageDisplay jQuery object replaces the HTML of that object with the current slide number out of the total number of slides. Check out the [demo](http://www.jsantell.com/presentr) and see the big pink box in the upper right?
* Slide Jump: Setting ``hashJump`` to true will update the URL with a hash on every slide event. The prefix can be changed by setting ``hashPrefix`` to the string you'd like to use. Copy and pasting the URL with the hash will jump right to the slide.

# More
Start using it! Grab or fork it from here, or contact me ([Twitter](http://www.twitter.com/jsantell), [my site](http://jsantell.com)) if you have any feedback!
