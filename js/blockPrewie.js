(function( exports ) {

    const

        HEIGHT_SCROLL = 300, // px
        ANIMATION_TIME = 300, // ms
        MIN_WIDTH = 550; // px

    function BlockPrewie( data ) {

        this.container = data.container;
        this.pubsub = data.pubsub;
        this.list = data.list;
        this.storage;
        this.mainContainer = data.main;

        this.pubsub.subscribe( 'listImages', this.createList.bind( this ) );
        this.pubsub.subscribe( 'setWidth', this.setWidth.bind( this ) );
        this.pubsub.subscribe( 'changeImg', this.changeImg.bind( this ) );

        var that = this,
            target;

        $(this.list).click(function(event) {

            target = event.target;

            if( target.tagName === 'IMG' ) {

                that.changeActiveElement( target.parentElement );

                if( that.widthMainBlock > MIN_WIDTH ) {

                    that.searchId( +target.dataset.id );
                }

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
            counter =  $(that.container).scrollTop() - HEIGHT_SCROLL;

            if( counter > 0 ) {

                scrollPrewie( that.container, counter );

            } else {

                counter = 0;
                scrollPrewie( that.container, counter );
            }
        });

        $(this.down).click(function( event ) {

            counter =  $(that.container).scrollTop() + HEIGHT_SCROLL;

            if( counter < heightScrollParent ) {

                scrollPrewie( that.container, counter );

            } else {

                counter = heightScrollParent;
                scrollPrewie( that.container, counter );
            }
        });

        addEventDragnDrop( this.down[0], this.mainContainer );
        addEventDragnDrop( this.up[0], this.mainContainer );
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

    function addEventDragnDrop( htmlElement, parent ) {

        htmlElement.addEventListener('mousedown', function( event ){

            function moveElement( event ) {

                htmlElement.style.left = event.pageX - htmlElement.offsetWidth / 2 + 'px';
                htmlElement.style.top = event.pageY - htmlElement.offsetHeight / 2 + 'px';
            }

            parent.onmousemove = function( event ) {
                moveElement( event );
            }

            htmlElement.onmouseup = function() {
                parent.onmousemove = null;
                htmlElement.onmouseup = null;
            };
        });
    };

    BlockPrewie.prototype.setWidth = function( data ) {
        this.widthMainBlock = data;
    };

    BlockPrewie.prototype.changeImg = function( data ) {

        var listImg = $(this.container).find('.small_photo'),
            that = this;

        if ( data <= MIN_WIDTH ) {

            this.storage.forEach( function( item, i ) {

                listImg[i].src = item.big;
            });

        } else

            if ( data >= MIN_WIDTH ) {

                this.storage.forEach( function( item, i ) {

                    listImg[i].src = item.small;
                });
            }
    }

    exports.BlockPrewie = BlockPrewie;

})( window );