import angular from 'angular';
import keyValueDirective from './key-value.directive';

let queryBuilderModule = angular.module('queryBuilderModule', []);
queryBuilderModule.directive('keyValue', keyValueDirective);

export default queryBuilderModule;