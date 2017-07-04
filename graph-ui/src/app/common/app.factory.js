import * as _ from 'lodash';

let appFactory = () => {
    let factoryObj = {
        findNode: (id, nodes) => {
            var node = {};
            nodes.forEach(function (item) {
                if (item.id == id) {
                    node = item;
                }
            });
            return node;
        },
        isItemPushed: (id, items) => {
            var bool = false;
            items.forEach(function (item) {
                if (item.id == id) {
                    bool = true;
                }
            });
            return bool;
        }
    };

    return factoryObj;
}

export default appFactory;