(function( exports ){

    var storage = {

        list : [
            {
                id     : 0,
                small  : 'img/small_photo_1.jpg',
                big    : 'img/big_photo_1.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 1,
                small  : 'img/small_photo_2.jpg',
                big    : 'img/big_photo_2.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            }
        ],

        getList : function() {
            var list = JSON.stringify( this.list );
            return list;
        }
    };

    window.storage = storage;

})( window );