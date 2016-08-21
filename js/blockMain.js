(function( exports ) {

    function BlockMain( data ) {

        this.container = data.container;
        this.pubsub = data.pubsub;
        this.mainPhoto = data.mainPhoto;
        this.wrapper = $(this.container).find('.wrapper')[0];

        this.pubsub.subscribe( 'new_img', this.changePhoto.bind( this ) );

        var that = this;

        $(this.container).click(function( event ) {
            var target = event.target;

            if( target.tagName === 'DIV' ) {

                that.pubsub.publish( 'message', target.dataset.name );
            }
        });
    }

    BlockMain.prototype.changePhoto = function( data ) {

        var that = this;

        this.mainPhoto.src = data.big;

        if( data.points.length > 0 ) {

            checkPoints( that.wrapper, '.point' );

            that.pubsub.publish( 'create_point', {
                parent : that.wrapper,
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
    }

    exports.BlockMain = BlockMain;

})( window );