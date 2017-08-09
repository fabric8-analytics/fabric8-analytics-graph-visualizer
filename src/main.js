import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeModule from './app/home';
import commonModule from './app/common';

let app = angular.module('app', [uiRouter, homeModule.name, commonModule.name]);

// here i am bootstrapping the angular application
angular.bootstrap(document, ['app']);