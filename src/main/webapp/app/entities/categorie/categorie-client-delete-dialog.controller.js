(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('CategorieClientDeleteController',CategorieClientDeleteController);

    CategorieClientDeleteController.$inject = ['$uibModalInstance', 'entity', 'Categorie'];

    function CategorieClientDeleteController($uibModalInstance, entity, Categorie) {
        var vm = this;

        vm.categorie = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Categorie.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
