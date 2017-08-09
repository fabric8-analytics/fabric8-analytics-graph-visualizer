import gremlinController from './gremlin.controller';

let gremlinComponent = {
    templateUrl: './template/app/gremlin/gremlin.tpl.html',
    controller: gremlinController,
    bindings: {
        host: '<'
    }
};

export default gremlinComponent;