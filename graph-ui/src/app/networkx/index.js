import angular from 'angular';
import visualizationNetworkxModule from './visualization';
import networkxComponent from './networkx.component';
import networkxConfig from './networkx.config';
import networkxService from './networkx.svc';

let networkxModule = angular.module('networkxModule', [visualizationNetworkxModule.name]);
networkxModule.config(networkxConfig);
networkxModule.component('networkxComponent', networkxComponent);
networkxModule.service('networkxService', networkxService);

export default networkxModule;