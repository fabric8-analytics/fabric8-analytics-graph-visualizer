import angular from 'angular';
import visualizationComponent from './visualization.component';

let visualizationModule = angular.module('visualizationGremlinModule', []);
visualizationModule.component('visualizationGremlin', visualizationComponent);

export default visualizationModule;