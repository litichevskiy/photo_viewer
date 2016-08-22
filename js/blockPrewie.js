(function( exports ) {

    const
        HEIGHT_SCROLL = 300,      // px
        WIDTH_SCROLL = 200,       // px
        MIN_WIDTH_VIEWPORT = 900, // px
        ANIMATION_TIME = 300;     // ms

    function BlockPrewie( data ) {

        this.container = data.container;
        this.pubsub = data.pubsub;
        this.list = data.list;
        this.storage;
        this.mainContainer = data.main;

        this.pubsub.subscribe( 'listImages', this.createList.bind( this ) );
        this.pubsub.subscribe( 'changeClass', this.changeClass.bind( this ) );

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
    };

    BlockPrewie.prototype.changeClass = function( data ) {

        if( data < MIN_WIDTH_VIEWPORT ) {
            $(this.container).removeClass('horisontal');
            $(this.container).addClass('vertical');
        } else
            if( data > MIN_WIDTH_VIEWPORT ) {
                $(this.container).removeClass('vertical');
                $(this.container).addClass('horisontal');
            }
    };

    BlockPrewie.prototype.createList = function( list ) {

        if ( list.length < 1 ) throw('link list is empty');

        this.storage = list;

        var fragment = document.createDocumentFragment(),
            that = this,
            element,
            dataHeight,
            dataWidth;

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
        dataHeight = this.getHeight( this.container, this.list );
        dataWidth = this.getWidth( this.list );

        if( dataHeight ) this.addEventScrollTop( dataHeight );
        if( dataWidth ) this.addEventScrollLeft( dataWidth );
    };

    BlockPrewie.prototype.getWidth = function( listImg ) {

        listImg.children.reduce = [].reduce;

        var width = listImg.children.reduce(function( result, item ) {
            return result + item.clientWidth;
        }, 0 );

        if( width > document.body.clientWidth ) {
            var data = addScrollElementsLeft( this.container );
            return data;
        }
    };

    function addScrollElementsLeft( parent ) {

        var left = $('<div class="scroll_left">&larr;</div>'),
            right = $('<div class="scroll_right">&rarr;</div>');

            $(parent).append( left );
            $(parent).append( right );

        return {
            left  : left,
            right : right
        }
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

    BlockPrewie.prototype.getHeight = function( parent, listImg ) {

        listImg.children.reduce = [].reduce;

        var height = listImg.children.reduce(function( result, item ) {
            return result + item.clientHeight;
        }, 0 );

        if( height > parent.clientHeight ) {
            var data = addScrollElementsTop( this.container );
            return data;
        }
    };

    BlockPrewie.prototype.addEventScrollLeft = function( data ) {

        this.left = data.left;
        this.right = data.right;

        var that = this,
            left, right;

        $(this.left).click(function( event ) {

            left = $(that.container).scrollLeft();

            scrollPrewieLeft( that.container, left -= WIDTH_SCROLL );
        });

        $(this.right).click(function( event ) {

            right = $(that.container).scrollLeft();

            scrollPrewieLeft( that.container, right += WIDTH_SCROLL );
        });

        addEventDragnDrop( this.left[0], this.mainContainer );
        addEventDragnDrop( this.right[0], this.mainContainer );
    };

    BlockPrewie.prototype.addEventScrollTop = function( data ) {

        this.up = data.up;
        this.down = data.down;

        var that = this,
            up, down;

        $(this.up).click(function( event ) {
            up = $(that.container).scrollTop();

            scrollPrewieTop( that.container, up - HEIGHT_SCROLL );
        });

        $(this.down).click(function( event ) {

            down =  $(that.container).scrollTop();

            scrollPrewieTop( that.container, down + HEIGHT_SCROLL );
        });

        addEventDragnDrop( this.down[0], this.mainContainer );
        addEventDragnDrop( this.up[0], this.mainContainer );
    };

    function scrollPrewieTop( htmlElement, value ) {

        $(htmlElement).animate({
                scrollTop : value },
                { scrollTop : 'ease-out', scrollTop : ANIMATION_TIME
            });
    };

    function scrollPrewieLeft( htmlElement, value ) {

        $(htmlElement).animate({
                scrollLeft : value },
                { scrollLeft : 'ease-out', scrollLeft : ANIMATION_TIME
            });
    };

    function addScrollElementsTop( parent ) {

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

        htmlElement.addEventListener('mousedown', function( event ) {

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

    exports.BlockPrewie = BlockPrewie;

})( window );