(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('ProduitClientDialogController', ProduitClientDialogController);

    ProduitClientDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Produit', 'Categorie'];

    function ProduitClientDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Produit, Categorie) {
        var vm = this;

        vm.produit = entity;
        vm.clear = clear;
        vm.save = save;
        vm.categories = Categorie.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.produit.id !== null) {
                Produit.update(vm.produit, onSaveSuccess, onSaveError);
            } else {
                Produit.save(vm.produit, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('boncmd8App:produitUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
