(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('ProduitClientDeleteController',ProduitClientDeleteController);

    ProduitClientDeleteController.$inject = ['$uibModalInstance', 'entity', 'Produit'];

    function ProduitClientDeleteController($uibModalInstance, entity, Produit) {
        var vm = this;

        vm.produit = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Produit.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
