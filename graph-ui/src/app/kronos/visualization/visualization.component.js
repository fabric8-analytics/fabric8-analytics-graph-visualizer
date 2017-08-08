import visualizationController from './visualization.controller';

let visualizationComponent = {
    templateUrl: './template/app/kronos/visualization/visualization.tpl.html',
    controller: visualizationController,
    bindings: {
        host: '<'
    }
};

export default visualizationComponent;