define([
    'component/system/index'
], function(){
    alt.factory('Iconplus_Master_Sppd2', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/sppd2');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        api.insert = function(data){
            return this.connect('insert', data);
        };

        api.retrieve = function(data){
            return this.connect('retrieve', data);
        };
        return api;
    }]);
});