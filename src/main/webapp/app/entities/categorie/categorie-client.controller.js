(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .controller('CategorieClientController', CategorieClientController);

    CategorieClientController.$inject = ['$scope', '$state', 'Categorie'];

    function CategorieClientController ($scope, $state, Categorie) {
        var vm = this;

        vm.categories = [];

        loadAll();

        function loadAll() {
            Categorie.query(function(result) {
                vm.categories = result;
                vm.searchQuery = null;
            });
        }
    }
})();
