import visualizationController from './visualization.controller';

let visualizationComponent = {
    templateUrl: './template/app/networkx/visualization/visualization.tpl.html',
    controller: visualizationController,
    bindings: {
        host: '<'
    }
};

export default visualizationComponent;