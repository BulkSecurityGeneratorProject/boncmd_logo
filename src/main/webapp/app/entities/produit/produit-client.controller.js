(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('ProduitClientController', ProduitClientController);

    ProduitClientController.$inject = ['$scope', '$state', 'Produit'];

    function ProduitClientController ($scope, $state, Produit) {
        var vm = this;

        vm.produits = [];

        loadAll();

        function loadAll() {
            Produit.query(function(result) {
                vm.produits = result;
                vm.searchQuery = null;
            });
        }
    }
})();
