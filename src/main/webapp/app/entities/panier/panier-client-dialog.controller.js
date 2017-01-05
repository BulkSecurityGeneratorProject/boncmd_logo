(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('PanierClientDialogController', PanierClientDialogController);

    PanierClientDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Panier', 'Commande', 'User'];

    function PanierClientDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Panier, Commande, User) {
        var vm = this;

        vm.panier = entity;
        vm.clear = clear;
        vm.save = save;
        vm.commandes = Commande.query();
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.panier.id !== null) {
                Panier.update(vm.panier, onSaveSuccess, onSaveError);
            } else {
                Panier.save(vm.panier, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('boncmd8App:panierUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
