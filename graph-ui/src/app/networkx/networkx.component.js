import networkxController from './networkx.controller';

let networkxComponent = {
    templateUrl: './template/app/networkx/networkx.tpl.html',
    controller: networkxController,
    bindings: {
        host: '<'
    }
};

export default networkxComponent;