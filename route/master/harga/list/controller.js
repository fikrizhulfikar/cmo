define([
    'asset/lib/moment/min/moment-with-locales.min',
    'component/alt/button/service',
    'component/iconplus/masterpendukung/harga'
], function(moment){
    return ['$scope', '$routeParams', '$log', '$button', '$auth', '$popup','Iconplus_View_Harga',
        function($scope, $routeParams, $log, $button, $auth, $popup,Iconplus_View_Harga){
        // toolbar

        $scope.harga = {};
            Iconplus_View_Harga.keyval().then(function(response){
            $scope.harga = response.data;
        });

        $scope.btnadd = $button('add', {
            title: 'Tambah',
            icon: 'fa fa-plus',
            class: 'btn btn-default',
            href: alt.baseUrl + 'master/harga/detail?action=add'
        });

        $scope.$auth = $auth;

        $scope.cari = {
                tahun : moment().format()
            };
            var datatahun = {};

                $scope.$watchGroup(["cari.tahun"], function (val) {
                if (val) {
                    var datatahun = moment($scope.cari.tahun).format('YYYY');
                    // var unit = $scope.cari.bidang;
                    // var chargecode = $scope.cari.chargecode;
                    $scope.table.reload();
                }
                // // console.log(datatahun);
                // // console.log(unit);
            });

        $scope.table = {
             filter: {
                    // id_tab: $scope.id_tab
                },
            total_data: [],
            isloading: null,
            reload: function () {
                // set parameter untuk dikirim
                var param = angular.copy($scope.table.filter);
                param.limit = $scope.table.limit;
                param.offset = $scope.table.offset;
                param.tahun = moment($scope.cari.tahun).format('YYYY');
                // param.tahun = datatahun;
                // cek apakah sedang mengambil data, batalkan jika ada
                if ($scope.table.isloading != null && $scope.table.isloading.abort)
                    $scope.table.isloading.abort();

                // kirim data ke server
                $scope.table.isloading = Iconplus_View_Harga.table(param);
                $scope.table.isloading.then(function (response) {
                    $scope.table.total = response.data.total;
                    $scope.table.data = response.data.list;
                });
            }
        };

        $scope.btnedit = function (index, item) {
            return $button('edit', {
                title: '',
                class: 'btn btn-sm btn-warning',
                href: alt.baseUrl + 'master/harga/detail?action=edit&id_tab=' + item.id_tab
            });
        };

        $scope.btnview = function (index, item) {
            return $button('view', {
                title: '',
                icon:'fa fa-eye',
                class: 'btn btn-sm btn-info',
                href: alt.baseUrl + 'master/harga/detail?action=view&id_tab=' + item.id_tab
            });
        };

        // $scope.btnremove = function (index, item) {
        //     return $button('remove', {
        //         title: '',
        //         class: 'btn btn-sm btn-danger',
        //         onclick: function () {
        //             $popup.confirm({
        //                 caption: "Anda yakin akan menghapus tahun : " + item.name + " ?",
        //                 buttons: [
        //                     $button('yes', {
        //                         onclick: function () {
        //                             Iconplus_Master_Unit.remove({unitid: item.unitid}).then(function (response) {
        //                                 $scope.table.reload();
        //                                 $alert.add('Data berhasil dihapus!', $alert.success);
        //                             });
        //                             $popup.close(true);
        //                         }
        //                     }),
        //                     $button('no', {
        //                         onclick: function () {
        //                             $popup.close(false);
        //                         }
        //                     })
        //                 ]
        //             });
        //         }
        //     });
        // };
        // $scope.$watch('filter',function(val, oldval){
        //     if(oldval.key != val.key){
        //         $scope.filter.value = '';
        //     }else {
        //         if ($scope.filter.key && $scope.filter.value) {
        //             if ($scope.filter.key != 'tahun') {
        //                 $scope.table.filter[$scope.filter.key] = $scope.filter.value;
        //             } else {
        //                 $scope.table.filter['where'] = $scope.filter.key + ' = ' + $scope.filter.value;
        //             }
        //         } else {
        //             $scope.table.filter = {};
        //         }
        //     }
        // },true);
    }];
});