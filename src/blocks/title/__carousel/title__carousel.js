var titleCarousel = $('.title__carousel');
titleCarousel.owlCarousel({
	items:5,
	loop:true,
	dots:false,
	margin:10,
	autoplay:true,
	autoplayTimeout:1000,
	autoplayHoverPause:true,
	responsive : {
    // breakpoint from 0 up
    0 : {
        items: 2
    },
    // breakpoint from 480 up
    576 : {
        items: 3
    },
    // breakpoint from 768 up
    768 : {
        items: 4
    },
    992 : {
        items: 4
    },
    1200 : {
        items: 5
    }
	}
});