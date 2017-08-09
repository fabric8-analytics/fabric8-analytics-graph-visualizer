let gremlinConfig = ($stateProvider) => {
    $stateProvider
        .state({
            name: 'home.gremlin',
            url: '/gremlin',
            params: {
                host: null
            },
            template: '<gremlin-component host="$ctrl.host"></gremlin-component>',
            controllerAs: '$ctrl',
            controller: function ($stateParams) {
                this.host = $stateParams.host;
            }
        });
}

export default gremlinConfig;