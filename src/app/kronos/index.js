import angular from 'angular';
import visualizationKronosModule from './visualization';
import kronosComponent from './kronos.component';
import kronosConfig from './kronos.config';
import kronosService from './kronos.svc';

let kronosModule = angular.module('kronosModule', [visualizationKronosModule.name]);
kronosModule.config(kronosConfig);
kronosModule.component('kronosComponent', kronosComponent);
kronosModule.service('kronosService', kronosService);

export default kronosModule;