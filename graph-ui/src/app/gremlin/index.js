import angular from 'angular';
import queryBuilderModule from './query-builder';
import visualizationModule from './visualization';
import gremlinService from './gremlin.svc';
import gremlinComponent from './gremlin.component';
import gremlinConfig from './gremlin.config';
import gremlinQueryService from './gremlin-query.svc';

let gremlinModule = angular.module('gremlinModule', [queryBuilderModule.name, visualizationModule.name]);
gremlinModule.config(gremlinConfig);
gremlinModule.service('gremlinService', gremlinService);
gremlinModule.service('gremlinQueryService', gremlinQueryService);
gremlinModule.component('gremlinComponent', gremlinComponent);

export default gremlinModule;