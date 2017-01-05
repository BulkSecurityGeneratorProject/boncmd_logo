(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('ProduitClientDetailController', ProduitClientDetailController);

    ProduitClientDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Produit', 'Categorie'];

    function ProduitClientDetailController($scope, $rootScope, $stateParams, previousState, entity, Produit, Categorie) {
        var vm = this;

        vm.produit = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('boncmd8App:produitUpdate', function(event, result) {
            vm.produit = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
