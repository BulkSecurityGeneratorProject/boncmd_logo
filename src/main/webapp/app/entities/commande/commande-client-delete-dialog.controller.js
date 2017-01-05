(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('CommandeClientDeleteController',CommandeClientDeleteController);

    CommandeClientDeleteController.$inject = ['$uibModalInstance', 'entity', 'Commande'];

    function CommandeClientDeleteController($uibModalInstance, entity, Commande) {
        var vm = this;

        vm.commande = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Commande.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
