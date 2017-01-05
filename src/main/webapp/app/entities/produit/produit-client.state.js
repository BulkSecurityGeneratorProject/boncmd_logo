(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('produit-client', {
            parent: 'entity',
            url: '/produit-client',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'boncmd8App.produit.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/produit/produits-client.html',
                    controller: 'ProduitClientController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('produit');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('produit-client-detail', {
            parent: 'entity',
            url: '/produit-client/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'boncmd8App.produit.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/produit/produit-client-detail.html',
                    controller: 'ProduitClientDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('produit');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Produit', function($stateParams, Produit) {
                    return Produit.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'produit-client',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('produit-client-detail.edit', {
            parent: 'produit-client-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/produit/produit-client-dialog.html',
                    controller: 'ProduitClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Produit', function(Produit) {
                            return Produit.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('produit-client.new', {
            parent: 'produit-client',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/produit/produit-client-dialog.html',
                    controller: 'ProduitClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                referenceProduit: null,
                                designation: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('produit-client', null, { reload: 'produit-client' });
                }, function() {
                    $state.go('produit-client');
                });
            }]
        })
        .state('produit-client.edit', {
            parent: 'produit-client',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/produit/produit-client-dialog.html',
                    controller: 'ProduitClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Produit', function(Produit) {
                            return Produit.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('produit-client', null, { reload: 'produit-client' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('produit-client.delete', {
            parent: 'produit-client',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/produit/produit-client-delete-dialog.html',
                    controller: 'ProduitClientDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Produit', function(Produit) {
                            return Produit.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('produit-client', null, { reload: 'produit-client' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
