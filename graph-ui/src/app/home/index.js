import angular from 'angular';
import gremlinModule from '../gremlin';
import kronosModule from '../kronos';
import homeComponent from './home.component';
import homeConfig from './home.config';

let homeModule = angular.module('homeModule', [gremlinModule.name, kronosModule.name]);
homeModule.config(homeConfig);
homeModule.component('home', homeComponent);

export default homeModule;