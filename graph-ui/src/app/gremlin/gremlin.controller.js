class GremlinController {
    constructor($scope, $state, appConstants, gremlinQueryService, appService, gremlinService) {
        this.$scope = $scope;
        this.$state = $state;
        this.constants = appConstants;
        this.gremlinQueryService = gremlinQueryService;
        this.appService = appService;
        this.gremlinService = gremlinService;
        this.host = null;
        this.tokenString = null;
        this.keyValueArray = [{
            key: '',
            value: ''
        }];
        this.gremlinquery = null;
    }

    $onInit() {

    }

    addKeyValue(index, keyValue) {
        this.keyValueArray.push({
            key: '',
            value: ''
        });
    }

    removeKeyValue(index, keyValue) {
        this.keyValueArray.splice(index, 1);
    }

    visualize() {
        this.networkData = null;
        this.gremlinQueryService.buildNodesFetchQuery(this.host, this.tokenString, this.keyValueArray);
        this.gremlinquery = this.gremlinQueryService.getNodes;
    }
}

export default GremlinController;