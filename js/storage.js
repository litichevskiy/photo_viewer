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
            },
            {
                id     : 2,
                small  : 'img/small_photo_3.jpg',
                big    : 'img/big_photo_3.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 3,
                small  : 'img/small_photo_4.jpg',
                big    : 'img/big_photo_4.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 4,
                small  : 'img/small_photo_5.jpg',
                big    : 'img/big_photo_5.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 5,
                small  : 'img/small_photo_6.jpg',
                big    : 'img/big_photo_6.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 6,
                small  : 'img/small_photo_7.jpg',
                big    : 'img/big_photo_7.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 7,
                small  : 'img/small_photo_8.jpg',
                big    : 'img/big_photo_8.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 8,
                small  : 'img/small_photo_9.jpg',
                big    : 'img/big_photo_9.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 9,
                small  : 'img/small_photo_10.jpg',
                big    : 'img/big_photo_10.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 10,
                small  : 'img/small_photo_11.jpg',
                big    : 'img/big_photo_11.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 11,
                small  : 'img/small_photo_12.jpg',
                big    : 'img/big_photo_12.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 12,
                small  : 'img/small_photo_13.jpg',
                big    : 'img/big_photo_13.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 13,
                small  : 'img/small_photo_14.jpg',
                big    : 'img/big_photo_14.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 14,
                small  : 'img/small_photo_15.jpg',
                big    : 'img/big_photo_15.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 15,
                small  : 'img/small_photo_16.jpg',
                big    : 'img/big_photo_16.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 16,
                small  : 'img/small_photo_17.jpg',
                big    : 'img/big_photo_17.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 17,
                small  : 'img/small_photo_18.jpg',
                big    : 'img/big_photo_18.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 18,
                small  : 'img/small_photo_19.jpg',
                big    : 'img/big_photo_19.jpg',
                points : [{point:'A',x:10,y:20},{point:'B',x:80,y:30},{point:'C',x:50,y:85}]
            },
            {
                id     : 19,
                small  : 'img/small_photo_20.jpg',
                big    : 'img/big_photo_20.jpg',
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