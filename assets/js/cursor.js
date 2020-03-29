(function($) {

    var baseCssClass = "cursor-trail",
        addPoint = function(pageX, pageY, cssClass, timeToGrow, timeToShrink, scale) {
            // Create a new point located at the mouse position
            var point = $("<div>", {
                "class": cssClass,
                css: {
                    left: pageX,
                    top: pageY
                }
            }).appendTo('body');

            // now make the point grow, then shrink and finally disappear
            point
                .transition({ scale: scale }, timeToGrow)
                .transition({ scale: 1 }, timeToShrink, function() { point.remove(); });
        };

    $.fn.cursorTrail = function(options) {
        // assign defaults for those options not supplied
        options = $.extend({
            timeToGrow: 500,
            timeToShrink: 500,
            scale: 10,
            "class": ""
        }, options);

        // add the base css class all cursor trail points need.
        var actualCssClass = baseCssClass;
        if (options["class"]) {
            actualCssClass += " " + options["class"];
        }

        return this.bind("mousemove", function(ev) {
            addPoint(ev.pageX, ev.pageY, actualCssClass, options.timeToGrow, options.timeToShrink, options.scale);
        });
    };
}(jQuery));

// jQuery.transit has a bug in older IE versions, so switch to jQuery animate
if (!$.support.transition) {
    $.fn.transition = $.fn.animate;
}

$("#inner").cursorTrail({
    "class": "yellow-trail"
});