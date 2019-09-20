define([
    'component/alt/button/service',
    'component/system/user',    
    'component/iconplus/masterpendukung/harga'
], function(){
    return ['$scope', '$routeParams', '$log', '$button', '$timeout', '$validate', '$window', '$alert', 'Iconplus_View_Harga',
    function($scope, $routeParams, $log, $button, $timeout, $validate, $window, $alert,Iconplus_View_Harga){
        $scope.detail = {
            action: $routeParams.action,
            tahun: $routeParams.tahun,
            id_tab: $routeParams.id_tab
        };
        $scope.toolbar = {
            title: 'Unit',
            description: $routeParams.action == 'add' ? 'Registrasi Unit' : $routeParams.action == 'view' ? 'Detail Unit' : 'Edit Unit'
        };

        $scope.breadcrumb = {
            data: [{
                title: 'Unit',
                url: alt.baseUrl + 'master/harga/list'
            }, {
                title: $scope.toolbar.description,
                isactive: true
            }]
        };

        $scope.action = $scope.detail.action;
        $scope.readonly = '';

        if($scope.action != 'add')  Iconplus_View_Harga.retrieve({id_tab: $scope.detail.id_tab}).then(function(response){
            $scope.harga = angular.copy(response.data);
            if($scope.detail.action == 'view') $scope.readonly = 'readonly';
        });

        // $scope.btnsave = $button('save', {
        //     title: 'Simpan',
        //     onclick: function(){
        //         if($scope.action == 'add'){
        //             $scope.unit.action = 'add';
        //             var isvalid = $validate()
        //                 .rule($validate.required($scope.unit.name), 'Harap isi Nama terlebih dahulu!')
        //                 .rule($validate.required($scope.unit.sname), 'Harap isi Singkatan Unit terlebih dahulu!')
        //                 .rule($validate.required($scope.unit.address), 'Harap isi Alamat terlebih dahulu!')
        //                 .rule($validate.required($scope.unit.telp), 'Harap isi Telpon terlebih dahulu!')
        //                 .check();
        //             if(!isvalid) return;
        //             Iconplus_Master_Unit.insert($scope.unit).then(function (response) {
        //                 $window.location.href = alt.baseUrl + 'master/regional/list';
        //                 $alert.add('Data berhasil disimpan!', $alert.success);
        //             });
        //         }else if($scope.action == 'edit')
        //         {
        //             var isvalid = $validate()
        //                 .rule($validate.required($scope.unit.name), 'Harap isi Nama terlebih dahulu!')
        //                 .rule($validate.required($scope.unit.sname), 'Harap isi Singkatan Unit terlebih dahulu!')
        //                 .rule($validate.required($scope.unit.address), 'Harap isi Alamat terlebih dahulu!')
        //                 .rule($validate.required($scope.unit.telp), 'Harap isi Telpon terlebih dahulu!')
        //                 .check();
        //             if(!isvalid) return;
        //             $scope.unit.action = 'edit';
        //             Iconplus_Master_Unit.update($scope.unit).then(function (response) {
        //                 $window.location.href = alt.baseUrl + 'master/regional/list';
        //                 $alert.add('Data berhasil diedit!', $alert.success);
        //             });
        //         }
        //     }
        // });

        $scope.btncancel = $button('cancel', {
            href : alt.baseUrl + 'master/harga/list'
        });
        
        $scope.btnback = $button('back', {
            href : alt.baseUrl + 'master/harga/list'
        });
        
    }];
});