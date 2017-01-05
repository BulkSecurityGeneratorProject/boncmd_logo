(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('commande-client', {
            parent: 'entity',
            url: '/commande-client',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'boncmd8App.commande.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/commande/commandes-client.html',
                    controller: 'CommandeClientController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('commande');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('commande-client-detail', {
            parent: 'entity',
            url: '/commande-client/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'boncmd8App.commande.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/commande/commande-client-detail.html',
                    controller: 'CommandeClientDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('commande');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Commande', function($stateParams, Commande) {
                    return Commande.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'commande-client',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('commande-client-detail.edit', {
            parent: 'commande-client-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/commande/commande-client-dialog.html',
                    controller: 'CommandeClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Commande', function(Commande) {
                            return Commande.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('commande-client.new', {
            parent: 'commande-client',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/commande/commande-client-dialog.html',
                    controller: 'CommandeClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                referenceCommande: null,
                                dateCommande: null,
                                emailContactAdministratif: null,
                                telContactAdministratif: null,
                                emailContactTechnique: null,
                                telContactTechnique: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('commande-client', null, { reload: 'commande-client' });
                }, function() {
                    $state.go('commande-client');
                });
            }]
        })
        .state('commande-client.edit', {
            parent: 'commande-client',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/commande/commande-client-dialog.html',
                    controller: 'CommandeClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Commande', function(Commande) {
                            return Commande.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('commande-client', null, { reload: 'commande-client' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('commande-client.delete', {
            parent: 'commande-client',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/commande/commande-client-delete-dialog.html',
                    controller: 'CommandeClientDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Commande', function(Commande) {
                            return Commande.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('commande-client', null, { reload: 'commande-client' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
