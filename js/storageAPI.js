var storageAPI = (function(){

    return {

        getListImages : function() {

            var defer = $.Deferred(),
                list = JSON.parse( storage.getList() );

            if( list.length > 0 ) defer.resolve( list );
            else defer.reject('the list is empty');

            return defer.promise();
        }
    }

})();