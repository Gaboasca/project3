function Gallery( container ) {
    this.container = container
    this.buttons = this.container.find('.filter');
    this.items = this.container.find('.item');

    this.expandImage();

    this.buttons.on('click', function(e) {
        e.preventDefault();
        var $this = $(e.target);
        var filter = $this.data('rel');

        if( !$this.hasClass('active') ) 
        {
            this.buttons.removeClass('active');
            $this.addClass('active');
            this.filter(filter)
        }
    }.bind(this));
};

Gallery.prototype.filter = function(category) {
    $.publish('changedCategory', category);
    if ( category == 'all' ) {
        this.items
            .not(':visible')
            .fadeIn();
    } else {
        this.items
            .stop(true, true)
            .fadeOut(0)
            .filter(function() {
                var dataFilter = $(this).data('filter');
                for(var i = 0; i < dataFilter.length; i++) {
                    if (dataFilter[i] == category)
                        return true;
                }
            })
            .fadeIn(1000); 
    }
};

Gallery.prototype.expandImage = function() {
    var img_overlay = $('.img-overlay');
    var overlay_item = $('.overlay-item');

    this.items.on('click', function(ev) {
        ev.preventDefault();
        img_overlay.fadeIn();
        $(this).find(overlay_item).fadeIn().addClass('active-overlay');
    });

    img_overlay.on('click', function() {
        img_overlay.fadeOut();
        overlay_item.fadeOut().removeClass('active-overlay');
    });

    $(window).on('keyup',function(e) {
        if (e.keyCode == 27) {
            img_overlay.fadeOut();
            overlay_item.fadeOut().removeClass('active-overlay');
        }
    });
};


