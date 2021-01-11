var reviewsCarousel = $('.reviews-carousel');
reviewsCarousel.owlCarousel({
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
        items: 1
    },
    992 : {
        items: 2
    }
	}
});