(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('panier-client', {
            parent: 'entity',
            url: '/panier-client',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'boncmd8App.panier.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/panier/paniers-client.html',
                    controller: 'PanierClientController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('panier');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('panier-client-detail', {
            parent: 'entity',
            url: '/panier-client/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'boncmd8App.panier.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/panier/panier-client-detail.html',
                    controller: 'PanierClientDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('panier');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Panier', function($stateParams, Panier) {
                    return Panier.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'panier-client',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('panier-client-detail.edit', {
            parent: 'panier-client-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/panier/panier-client-dialog.html',
                    controller: 'PanierClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Panier', function(Panier) {
                            return Panier.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('panier-client.new', {
            parent: 'panier-client',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/panier/panier-client-dialog.html',
                    controller: 'PanierClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                quantite: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('panier-client', null, { reload: 'panier-client' });
                }, function() {
                    $state.go('panier-client');
                });
            }]
        })
        .state('panier-client.edit', {
            parent: 'panier-client',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/panier/panier-client-dialog.html',
                    controller: 'PanierClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Panier', function(Panier) {
                            return Panier.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('panier-client', null, { reload: 'panier-client' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('panier-client.delete', {
            parent: 'panier-client',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/panier/panier-client-delete-dialog.html',
                    controller: 'PanierClientDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Panier', function(Panier) {
                            return Panier.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('panier-client', null, { reload: 'panier-client' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
