(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('PanierClientDeleteController',PanierClientDeleteController);

    PanierClientDeleteController.$inject = ['$uibModalInstance', 'entity', 'Panier'];

    function PanierClientDeleteController($uibModalInstance, entity, Panier) {
        var vm = this;

        vm.panier = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Panier.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
