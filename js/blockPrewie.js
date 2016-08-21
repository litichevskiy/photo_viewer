(function( exports ) {

    const

        HEIGHTSCROLL = 300,
        ANIMATION_TIME = 300;

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
            element, data;

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
        data = this.getHeight( this.container, this.list );

        if( data ) this.addEventScroll( data );
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

    BlockPrewie.prototype.getHeight = function( parent, children ) {

        var parentHeight = $(parent).height(),
            childrenHeight = $(children).height(),
            data;

        if( childrenHeight > parentHeight ) {

            data = addScrollElements( parent, children );

            return data;
        }
    };

    BlockPrewie.prototype.addEventScroll = function( data ) {

        this.up = data.up;
        this.down = data.down;

        $(this.container).scrollTop( 9000000000 ); // px

        var that = this,
            counter = 0,
            heightScrollParent = $(this.container).scrollTop();

        $(this.container).scrollTop(0);

        $(this.up).click(function( event ) {
            counter =  $(that.container).scrollTop() - HEIGHTSCROLL;
            // counter -= HEIGHTSCROLL;

            if( counter > 0 ) {

                scrollPrewie( that.container, counter );

            } else {

                counter = 0;
                scrollPrewie( that.container, counter );
            }
        });

        $(this.down).click(function( event ) {

            counter =  $(that.container).scrollTop() + HEIGHTSCROLL;
            // counter -= HEIGHTSCROLL;

            if( counter < heightScrollParent ) {

                scrollPrewie( that.container, counter );

            } else {

                counter = heightScrollParent;
                scrollPrewie( that.container, counter );
            }
        });
    };

    function scrollPrewie( htmlElement, value ) {

        $(htmlElement).animate({
                scrollTop : value },
                { scrollTop : 'ease-out', scrollTop : ANIMATION_TIME
            });
    }

    function addScrollElements( parent, children ) {

        var up = $('<div class="scrollUp">&#8593;</div>'),
            down = $('<div class="scrollDown">&#8595;</div>');

            $(parent).append( up );
            $(parent).append( down );

        return {
            up   : up,
            down : down
        }
    }

    exports.BlockPrewie = BlockPrewie;

})( window );