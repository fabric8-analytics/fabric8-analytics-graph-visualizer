import angular from 'angular';
import visualizationComponent from './visualization.component';

let visualizationKronosModule = angular.module('visualizationKronosModule', []);
visualizationKronosModule.component('visualizationKronos', visualizationComponent);

export default visualizationKronosModule;