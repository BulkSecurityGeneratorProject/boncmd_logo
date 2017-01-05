(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('CategorieClientDetailController', CategorieClientDetailController);

    CategorieClientDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Categorie'];

    function CategorieClientDetailController($scope, $rootScope, $stateParams, previousState, entity, Categorie) {
        var vm = this;

        vm.categorie = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('boncmd8App:categorieUpdate', function(event, result) {
            vm.categorie = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
