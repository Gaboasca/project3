var x = new Slider( $('.l-slider') );
var y = new Gallery( $('.gallery') );
var check = true;

(function() {
    $(window).on('resize', function() {
        this._onResize();
        this.checkMenu();
    });

    $.subscribe('changedCategory', function(ev, category) {
            $('.section__title span').text(category);
    });

    $(".header__items--menu").on('click', function(e) {
        e.preventDefault();
        $(".navigation").stop(true,true).slideToggle();
        check = true;
    });
})();

function _onResize() {
    x._resizeSlider();
};

function checkMenu() {
    if ( check == true){
        if($(window).width() > 601){
            check  = false;
            $(".navigation").slideUp(0);
        }
    }
};