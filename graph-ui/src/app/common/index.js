import angular from 'angular';
import appService from './app.svc';
import appConstants from './app.constants';
import appFactory from './app.factory';

let commonModule = angular.module('common', []);
commonModule.service('appService', appService);
commonModule.constant('appConstants', appConstants);
commonModule.factory('appFactory', appFactory);

export default commonModule;