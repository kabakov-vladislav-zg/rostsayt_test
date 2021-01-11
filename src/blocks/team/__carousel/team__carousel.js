var teamCarousel = $('.team__carousel');
teamCarousel.owlCarousel({
    onChanged: changedFace,
	items:5,
	loop:true,
	dots:false,
	margin:10,
	autoplay:true,
	autoplayTimeout:3000,
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

//с божей помощью работает

function changedFace() {
    let element = document.querySelector('.active > .item.team__item');
    if (element) {
        let id = Number(element.dataset.team) + 1;
        if (id == 15) {
            id = 0;
        };
        let face = document.querySelector('.team__face');
        face.className = `team__face team__face_${id} skew__col skew__right-content d-none d-md-block`
        let quote = document.querySelector('.team__quote');
        quote.className = `team__quote team__quote_${id}`;
    }
}

