(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('CommandeClientController', CommandeClientController);

    CommandeClientController.$inject = ['$scope', '$state', 'Commande'];

    function CommandeClientController ($scope, $state, Commande) {
        var vm = this;

        vm.commandes = [];

        loadAll();

        function loadAll() {
            Commande.query(function(result) {
                vm.commandes = result;
                vm.searchQuery = null;
            });
        }
    }
})();
