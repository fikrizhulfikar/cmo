define([
    'component/system/index'
], function(){
    alt.factory('Master_VSapBudgetUpdate', ['System', '$log', '$q', function(System, $log, $q){
        var api = System('master/vsapbudgetupdate');

        api.table = function(data){
            return this.connect('table', data);
        };

        api.list = function(data){
            return this.connect('list', data);
        };

        api.keyval = function(data){
            return this.connect('keyval', data);
        };

        api.update = function(data){
            return this.connect('update', data);
        };

        return api;
    }]);
});