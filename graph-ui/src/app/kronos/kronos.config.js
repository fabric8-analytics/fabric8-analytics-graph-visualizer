let kronosConfig = ($stateProvider) => {
    $stateProvider
        .state({
            name: 'home.kronos',
            url: '/kronos',
            params: {
                host: null
            },
            template: '<kronos-component host="$ctrl.host"></kronos-component>',
            controllerAs: '$ctrl',
            controller: function ($stateParams) {
                this.host = $stateParams.host;
            }
        });
}

export default kronosConfig;