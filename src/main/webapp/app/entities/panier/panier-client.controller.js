(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('PanierClientController', PanierClientController);

    PanierClientController.$inject = ['$scope', '$state', 'Panier'];

    function PanierClientController ($scope, $state, Panier) {
        var vm = this;

        vm.paniers = [];

        loadAll();

        function loadAll() {
            Panier.query(function(result) {
                vm.paniers = result;
                vm.searchQuery = null;
            });
        }
    }
})();
