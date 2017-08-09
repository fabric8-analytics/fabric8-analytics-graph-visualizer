let homeConfig = ($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state({
            name: 'home',
            url: '/home',
            template: '<home></home>'
        });

    $urlRouterProvider.otherwise('/home');
}

export default homeConfig;