(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('CommandeClientDetailController', CommandeClientDetailController);

    CommandeClientDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Commande', 'Produit'];

    function CommandeClientDetailController($scope, $rootScope, $stateParams, previousState, entity, Commande, Produit) {
        var vm = this;

        vm.commande = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('boncmd8App:commandeUpdate', function(event, result) {
            vm.commande = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
