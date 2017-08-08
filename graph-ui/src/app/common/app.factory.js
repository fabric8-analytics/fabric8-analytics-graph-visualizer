import * as _ from 'lodash';

let appFactory = () => {
    let factoryObj = {
        findNode: (id, nodes) => {
            let node = {};
            nodes.forEach((item) => {
                if (item.id === id) {
                    node = item;
                }
            });
            return node;
        },
        isNodeExistsInDataset: (value, key, dataset) => {
            let nodes = dataset['_data'];
            for (let node in nodes) {
                if (nodes.hasOwnProperty(node) && nodes[node][key] === value) {
                    return true;
                }
            }
            return false;
        }
    };

    return factoryObj;
}

export default appFactory;