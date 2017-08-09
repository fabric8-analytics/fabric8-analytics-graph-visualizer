import visualizationController from './visualization.controller';

let visualizationComponent = {
    templateUrl: './template/app/gremlin/visualization/visualization.tpl.html',
    controller: visualizationController,
    bindings: {
        gremlinquery: '<'
    }
};

export default visualizationComponent;
