(function( exports ) {

    function BlockMain( data ) {

        this.container = data.container;
        this.wrapper = data.wrapper;
        this.pubsub = data.pubsub;
        this.mainPhoto = data.mainPhoto;
        this.wrapper = $(this.container).find('.wrapper')[0];
        this.loadImg = data.load;

        this.showImg = this.showMainImg.bind( this );

        this.pubsub.subscribe( 'new_img', this.changePhoto.bind( this ) );

        var that = this;

        $(this.container).click(function( event ) {

            if( event.target.tagName === 'DIV' ) {

                that.pubsub.publish( 'message', event.target.dataset.name );
            }
        });
    }

    BlockMain.prototype.changePhoto = function( data ) {

        $(this.wrapper).css({ 'opacity' : '0'});
        $(this.loadImg).css({ 'opacity' : '1'});
        this.mainPhoto.src = data.big;

        this.mainPhoto.addEventListener( 'load', this.showImg );

        if( data.points.length > 0 ) {

            checkPoints( this.wrapper, '.point' );

            this.pubsub.publish( 'create_point', {
                parent : this.wrapper,
                points : data.points
            });
        }
    };

    function checkPoints( parent, className ) {

        var points = parent.querySelectorAll( className );

        if ( points.length > 0 ) {

            points.forEach = [].forEach;

            points.forEach(function( item ) {

                parent.removeChild( item );
            });
        }
    };

    BlockMain.prototype.showMainImg = function() {
        $(this.wrapper).css({ 'opacity' : '1' });
        $(this.loadImg).css({ 'opacity' : '0'});
    }

    exports.BlockMain = BlockMain;

})( window );