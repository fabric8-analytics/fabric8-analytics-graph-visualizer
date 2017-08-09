import kronosController from './kronos.controller';

let kronosComponent = {
    templateUrl: './template/app/kronos/kronos.tpl.html',
    controller: kronosController,
    bindings: {
        host: '<'
    }
};

export default kronosComponent;