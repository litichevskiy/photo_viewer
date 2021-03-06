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
            wrapper   : document.querySelector('.wrapper'),
            load   : document.querySelector('.loading_img'),
            mainPhoto : document.querySelector('.main_photo')
        });

    pubsub.publish( 'init' );
    pubsub.publish( 'setWidth', document.body.clientWidth );

    window.onresize = function( event ) {
        pubsub.publish( 'changeClass', document.body.clientWidth );
    };

    window.onload = function( event ) {
        pubsub.publish( 'changeClass', document.body.clientWidth );
    };

    setTimeout(function() {

        storageAPI.getListImages()
        .then(function( result ) {

            pubsub.publish( 'init_true' );
            pubsub.publish( 'listImages', result );

        })
        .fail(function( error ) {

            pubsub.publish( 'init_false' , 'Failed to load images' );
        });

    }, 200 );

})();