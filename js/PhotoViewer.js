(function( exports ) {

    const
        CONTENT = 'You clicked on a point: ';

    function PhotoViewer( data ) {

        this.container = data.container;
        this.pubsub = data.pubsub;
        this.userMessage = data.userInfo;
        this.alert = data.alert;
        this.contentAlert = $(this.alert).find('.content');
        this.closeAlert = $(this.alert).find('.close');

        var that = this;

        $(this.closeAlert).click(function(event) {
            that.hideUserMessage();
        });

        this.pubsub.subscribe( 'init', this.showUserMessageInit.bind( this ) );
        this.pubsub.subscribe( 'init_true', this.showPhotoViewer.bind( this ) );
        this.pubsub.subscribe( 'init_false', this.showUserMessageError.bind( this ) );
        this.pubsub.subscribe( 'message', this.showUserMessage.bind( this ) );
        this.pubsub.subscribe( 'new_img', this.hideUserMessage.bind( this ) );
    }

    PhotoViewer.prototype.showPhotoViewer = function() {
        $(this.userMessage).hide( 0 );
        $(this.userMessage).html('');
        $(this.container).show( 0 );
    };

    PhotoViewer.prototype.showUserMessageError = function( text ) {
        $(this.userMessage).show( 0 );
        $(this.userMessage).html( text );
    };

    PhotoViewer.prototype.showUserMessageInit = function( text ) {
        $(this.userMessage).show( 0 );
        $(this.userMessage).html( text );
    };

    PhotoViewer.prototype.showUserMessage = function( text ) {
        $(this.alert).show( 0 );
        $(this.contentAlert).html( CONTENT + '<span>'+text+'</span>' );

        this.alertActive = true;
    };

    PhotoViewer.prototype.hideUserMessage = function() {

        if( this.alertActive ) {

            $(this.alert).hide( 0 );
            this.alertActive = false;
        }
    };

    exports.PhotoViewer = PhotoViewer;

})( window );