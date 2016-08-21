(function( exports ) {

    function BlockPrewie( data ) {

        this.container = data.container;
        this.pubsub = data.pubsub;
        this.list = data.list;
        this.storage;

        this.pubsub.subscribe( 'listImages', this.createList.bind( this ) );

        var that = this,
            target;

        $(this.list).click(function(event) {

            target = event.target;

            if( target.tagName === 'IMG' ) {

                that.changeActiveElement( target.parentElement );
                that.searchId( +target.dataset.id );

            } else

                if ( target.tagName === 'DIV' ) {

                    that.pubsub.publish( 'message', target.dataset.name );
                }
        });
    }

    BlockPrewie.prototype.createList = function( list ) {

        if ( list.length < 1 ) throw('error')

        this.storage = list;

        var fragment = document.createDocumentFragment(),
            that = this,
            element;

        list.forEach(function( item ) {

            element = $(
                '<li class="item_prewie"><img class="small_photo"'+
                'data-id="'+item.id+'" src="'+item.small+'"></li>'
            );

            $(fragment).append( element );

            if( item.points.length > 0 ) {

                that.pubsub.publish( 'create_point', {
                    parent : element,
                    points : item.points
                });
            }
        });

        $(this.list).append( fragment );

        this.pubsub.publish( 'new_img', this.storage[0] );
        this.changeActiveElement( this.list.children[0] );
    };


    BlockPrewie.prototype.changeActiveElement = function( element ) {

        if( this.activeElement === element ) return;

        if( this.activeElement ) {

            $(this.activeElement).removeClass('active');
            this.activeElement = element;
            $(this.activeElement).addClass('active');

        } else {

            this.activeElement = element;
            $(this.activeElement).addClass('active');
        }
    };

    BlockPrewie.prototype.searchId = function( id ) {

        var that = this;

        this.storage.every(function( item ) {

            if ( item.id === id ) {

                that.pubsub.publish( 'new_img', item );
                return false;

            }

            return true;
        })

    };

    exports.BlockPrewie = BlockPrewie;

})( window );