(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('PanierClientDetailController', PanierClientDetailController);

    PanierClientDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Panier', 'Commande', 'User'];

    function PanierClientDetailController($scope, $rootScope, $stateParams, previousState, entity, Panier, Commande, User) {
        var vm = this;

        vm.panier = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('boncmd8App:panierUpdate', function(event, result) {
            vm.panier = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
