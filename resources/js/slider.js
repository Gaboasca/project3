function Slider( container ) {     
    this.container = container;
    this.containerWrap = this.container.find('.slider');
    this.containerNav = this.container.find('.buttons');
    this.ul = this.containerWrap.children('ul');    
    this.li = this.ul.children('li');     
    this.isAnimating = false;

    this._resize();
    
    this._timer();
    
    //move the last item before first item, just in case user clicks prev button
    this.li.first().before(this.li.last());
    //set the default item to the correct position 
    this.ul.css({'left': this.leftValue});


    this.containerNav.find('.slider__button').on("click",function(ev) {
        ev.preventDefault();
        this.move( $(ev.target).data('dir') );
    }.bind(this));
};

Slider.prototype._resize = function () {
    //grab the width and calculate left value
    this.itemWidth = this.container.outerWidth();
    this.li.css('width', this.itemWidth);
    this.ul.css('width', this.itemWidth * this.li.length);
    this.leftValue = this.itemWidth * (-1);
    this.ul.css({'left': this.leftValue});
};

Slider.prototype._timer = function() {
    this.interval = setInterval(function(){ 
        this.move('next');
    }.bind(this), 8000);

    this.container.parent().on({
        mouseleave: function() {
            this.interval = setInterval(function(){ 
                this.move('next');
            }.bind(this), 8000);
        }.bind(this),
        mouseenter: function() {
            clearInterval(this.interval);
        }.bind(this)
    });
};

Slider.prototype.changeBackgroundColor = function() {
    var first_section_bg = $('.first-section-bg');
	var x = Math.floor(Math.random() * 255);
	var y = Math.floor(Math.random() * 255);
	var z = Math.floor(Math.random() * 255);
	var rgb = "rgb(" + x + "," + y + "," + z + ")"; 
    var rgb_border = "rgb(" + (x+10) + "," + (y+10) + "," + (z+10) + ")";
	first_section_bg.css('backgroundColor', rgb);
    first_section_bg.css('border-color', rgb_border);
};

Slider.prototype.move = function( dir ) {
    var left_indent;
    if(this.isAnimating) return;
    this.isAnimating = true;

    // update the li list to reflect the DOM order
    this.li = this.ul.children('li');

    //get the right position
    if (dir === 'next') {
        left_indent = parseInt(this.ul.css('left')) - this.itemWidth;
    }
    else {
        left_indent = parseInt(this.ul.css('left')) + this.itemWidth;
    }
    
    this.changeBackgroundColor();

    //slide the item  
    this.ul.animate({'left': left_indent}, 2000, function(){
    	
        if (dir === 'next') {
            this.li.last().after(this.li.first());
        }
        else {
            this.li.first().before(this.li.last());
        }

        //set the default item to correct position
        this.ul.css({'left': this.leftValue});

        this.isAnimating = false;
    }.bind(this));
};

