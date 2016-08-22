(function() {

    var pubsub = new PubSub,
        photoViewer = new PhotoViewer({
            pubsub    : pubsub,
            container : document.querySelector('.container_photo_viewer'),
            userInfo  : document.querySelector('.userInfo'),
            alert     : document.querySelector('.alert')
        }),

        createPoints = new CreatePoints({
            pubsub : pubsub
        }),

        blockPrewie = new BlockPrewie({
            pubsub    : pubsub,
            container : document.querySelector('.block_prewie'),
            list      : document.querySelector('.list_prewie'),
            main      : document.querySelector('.container_photo_viewer')
        }),

        blockMain = new BlockMain({
            pubsub    : pubsub,
            container : document.querySelector('.block_main'),
            mainPhoto : document.querySelector('.main_photo')
        });

    pubsub.publish( 'init', 'loading' );
    pubsub.publish( 'setWidth', document.body.clientWidth );

    window.onresize = function( event ) {
        pubsub.publish( 'setWidth', document.body.clientWidth );
        pubsub.publish( 'changeImg', document.body.clientWidth );
    }

    setTimeout(function(){

        storageAPI.getListImages()
        .then(function( result ) {

            pubsub.publish( 'init_true' );
            pubsub.publish( 'listImages', result );

        })
        .fail(function( error ) {
            pubsub.publish( 'init_false' , 'Failed to load images' );
        });

    }, 0 );


})();