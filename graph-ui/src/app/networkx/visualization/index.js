import angular from 'angular';
import visualizationComponent from './visualization.component';

let visualizationNetworkxModule = angular.module('visualizationNetworkxModule', []);
visualizationNetworkxModule.component('visualizationNetworkx', visualizationComponent);

export default visualizationNetworkxModule;