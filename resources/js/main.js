(function() {
    var x = new Slider( $('.l-slider') );
    var y = new Gallery( $('.gallery') );

    $.subscribe('changedCategory', function(ev, category) {
            $('.section__title span').text(category);
    });

    $(window).on('resize', function() {
        x._resize();
    });

    $(".header__items--menu").on('click', function(e) {
        e.preventDefault();
        $(".navigation-media").stop(true,true).slideToggle();
    });

    
})();


