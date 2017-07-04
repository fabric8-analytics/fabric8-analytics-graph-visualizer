let networkxConfig = ($stateProvider) => {
    $stateProvider
        .state({
            name: 'home.networkx',
            url: '/networkx',
            params: {
                host: null
            },
            template: '<networkx-component host="$ctrl.host"></networkx-component>',
            controllerAs: '$ctrl',
            controller: function ($stateParams) {
                this.host = $stateParams.host;
            }
        });
}

export default networkxConfig;