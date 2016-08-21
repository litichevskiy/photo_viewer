(function( exports ){

    function CreatePoints( data ) {

        this.pubsub = data.pubsub;

        this.pubsub.subscribe( 'create_point', this.addPoint.bind( this ) );
    }

    CreatePoints.prototype.addPoint = function( data ) {

        var parent = data.parent,
            listPoints = data.points,
            fragment = document.createDocumentFragment(),
            element;

        listPoints.forEach(function( item ) {

            element = $('<div class="point" data-name="'+item.point+'"></div>');

            $(element).css({
                'top'  : item.x + '%',
                'left' : item.y + '%'
            });

            $(fragment).append(element);
        });

        $(parent).append( fragment );
    };

    exports.CreatePoints = CreatePoints;

})( window )