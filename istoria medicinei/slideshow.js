function isVisible($obj) {
    // use viewport
    var vpH = $(window).height(),
        st = $(window).scrollTop(),
        y = $obj.offset().top,
        elementHeight = $obj.height();

    // if the element is lower than the viewport, it is not visible
    if (y > vpH + st) return false;
    // if the element is higher than the viewport + the height of the element, it is not visible
    if (y < st - elementHeight) return false;

    // images have a big margin, so we check if the element is at least somewhat visible
    var visibleRatio = (y < st ? (y + elementHeight - st) : (st + vpH - y)) / elementHeight;

    if (visibleRatio < 0.4) return false;

    // otherwise it is visible
    return true;
}

$(function(){
    setInterval(function(){
        // first check if the first image is visible
        if (!isVisible($('.slideshow img:first-of-type'))) {
            // if not, then skip to the next one
            console.log('skipping');
            return;
        }
        let $first = $('.slideshow img:first-of-type');
        let $next = $first.next('img');

        //make the images fade in and out of each other
        $first.fadeOut(1000, function(){
            $first.remove();
            $('.slideshow').append($first);
        });
        setTimeout(function() {
            $next.hide().fadeIn(2000);
        }, 500); // start fadeIn halfway through fadeOut
    }, 5000);
});