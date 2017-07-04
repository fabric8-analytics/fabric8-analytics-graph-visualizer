class HomeController {
    constructor($state, appConstants) {
        this.$state = $state;
        this.constants = appConstants;
        this.middlewareOptions = [{
            value: 'default',
            text: this.constants.middleware.default
        }, {
            value: 'gremlin',
            text: this.constants.middleware.gremlin
        }, {
            value: 'networkx',
            text: this.constants.middleware.networkx
        }];
        this.host = null;
        this.middleware = this.middlewareOptions[0].value;
    }

    onChangeMiddleware() {
        
    }

    proceedForGremlin() {
        if (this.middleware !== 'default' && this.middleware === 'gremlin') {
            this.$state.go('home.gremlin', {
                host: this.host
            });
        }
    }

    visualizeNetworkX() {
        if (this.middleware !== 'default' && this.middleware === 'networkx') {
            this.$state.go('home.networkx', {
                host: this.host
            });
        }
    }
}

export default HomeController;