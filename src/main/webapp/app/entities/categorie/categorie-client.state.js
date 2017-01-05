(function() {
    'use strict';

    angular
        .module('boncmd8App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('categorie-client', {
            parent: 'entity',
            url: '/categorie-client',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'boncmd8App.categorie.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/categorie/categories-client.html',
                    controller: 'CategorieClientController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('categorie');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('categorie-client-detail', {
            parent: 'entity',
            url: '/categorie-client/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'boncmd8App.categorie.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/categorie/categorie-client-detail.html',
                    controller: 'CategorieClientDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('categorie');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Categorie', function($stateParams, Categorie) {
                    return Categorie.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'categorie-client',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('categorie-client-detail.edit', {
            parent: 'categorie-client-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/categorie/categorie-client-dialog.html',
                    controller: 'CategorieClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Categorie', function(Categorie) {
                            return Categorie.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('categorie-client.new', {
            parent: 'categorie-client',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/categorie/categorie-client-dialog.html',
                    controller: 'CategorieClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                referenceCategorie: null,
                                description: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('categorie-client', null, { reload: 'categorie-client' });
                }, function() {
                    $state.go('categorie-client');
                });
            }]
        })
        .state('categorie-client.edit', {
            parent: 'categorie-client',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/categorie/categorie-client-dialog.html',
                    controller: 'CategorieClientDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Categorie', function(Categorie) {
                            return Categorie.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('categorie-client', null, { reload: 'categorie-client' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('categorie-client.delete', {
            parent: 'categorie-client',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/categorie/categorie-client-delete-dialog.html',
                    controller: 'CategorieClientDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Categorie', function(Categorie) {
                            return Categorie.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('categorie-client', null, { reload: 'categorie-client' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
