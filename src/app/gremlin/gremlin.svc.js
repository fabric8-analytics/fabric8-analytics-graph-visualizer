import vis from 'vis';

class GraphService {
    constructor(appFactory) {
        this.appFactory = appFactory;
        this.propertyNodes = [];
        this.propertyEdges = [];
    }

    getGraphDataForPackages(data) {
        let networkData = {
            nodes: new vis.DataSet(),
            edges: new vis.DataSet()
        };
        return new Promise((resolve, reject) => {
            let jsonData = data;
            if (data && typeof data === 'string') {
                jsonData = JSON.parse(data);
            }
            if (jsonData.data.result && jsonData.data.result.data && jsonData.data.result.data.length > 0) {
                jsonData.data.result.data.forEach((item, index) => {
                    if (!this.appFactory.isNodeExistsInDataset(item.id, 'id', networkData.nodes)) {
                        let label = '';
                        let properties = item.properties;
                        let type = properties.vertex_label ? properties.vertex_label[0].value : '';
                        label = properties.vertex_label[0].value;
                        if ( type.toLowerCase() === 'user' ) {
                            label = 'User : ' + properties.userid[0].value;
                        }
                        if ( type.toLowerCase() === 'package' ) {
                            label = 'Package : ' + properties.name[0].value;
                        }
                        if ( type.toLowerCase() === 'version' ) {
                            let e = properties.pecosystem ? properties.pecosystem[0].value + ' : ': '';
                            let p = properties.pname ? properties.pname[0].value + ' : ': '';
                            let v = properties.version ? properties.version[0].value : '';
                            label = e + p + v;
                        }
                        if ( type.toLowerCase() === 'license' ) {
                            label = 'License : ' + properties.lname[0].value;
                        }
                        if ( type.toLowerCase() === 'user_stack' ) {
                            label = 'Stack : ' + properties.stackid[0].value;
                        }
                        networkData.nodes.add({
                            id: item.id,
                            label: label
                        });
                    }
                });
            }
            resolve(networkData);
        });
    }

    getPropertyNodes(data, networkData) {
        let jsonData = data;
        if (data && typeof data === 'string') {
            jsonData = JSON.parse(data);
        }
        if (jsonData.data.result && jsonData.data.result.data && jsonData.data.result.data.length > 0) {
            jsonData.data.result.data.forEach((item, index) => {
                for (let key in item.properties) {
                    let propertyNodeId = item.properties[key][0].id;
                    let propertyEdgeId = propertyNodeId + '_edge';
                    let propertyNodeValue = item.properties[key][0].value;
                    this.propertyNodes.push({
                        id: propertyNodeId
                    });
                    this.propertyEdges.push({
                        id: propertyEdgeId
                    });
                    if (!this.appFactory.isNodeExistsInDataset(propertyNodeId, 'id', networkData.nodes)) {
                        networkData.nodes.add({
                            'id': propertyNodeId,
                            'label': key,
                            'shape': 'dot',
                            'size': 10,
                            'title': propertyNodeValue
                        });
                        networkData.edges.add({
                            'from': item.id,
                            'label': 'isProperty',
                            'to': propertyNodeId,
                            'id': propertyEdgeId,
                            'font': {
                                'align': 'middle'
                            }
                        });
                    }
                }
            })
        }
    }

    getAdjacentNodes(data, networkData) {
        let jsonData = data;
        if (data && typeof data === 'string') {
            jsonData = JSON.parse(data);
        }
        if (jsonData.data.result && jsonData.data.result.data && jsonData.data.result.data.length > 0) {
            jsonData.data.result.data.forEach((item, index) => {
                if (!this.appFactory.isNodeExistsInDataset(item.objects[2].id, 'id', networkData.nodes)) {
                    let label = '';
                    if (item.objects[2] && item.objects[2].properties) {
                        let properties = item.objects[2].properties;
                        let type = properties.vertex_label ? properties.vertex_label[0].value : '';
                        label = properties.vertex_label[0].value;
                        if ( type.toLowerCase() === 'user' ) {
                            label = 'User : ' + properties.userid[0].value;
                        }
                        if ( type.toLowerCase() === 'package' ) {
                            label = 'Package : ' + properties.name[0].value;
                        }
                        if ( type.toLowerCase() === 'version' ) {
                            label = properties.pecosystem[0].value + ' : ' + properties.pname[0].value + ' : ' + properties.version[0].value;
                        }
                        if ( type.toLowerCase() === 'license' ) {
                            label = 'License : ' + properties.lname[0].value;
                        }
                        if ( type.toLowerCase() === 'user_stack' ) {
                            label = 'Stack : ' + properties.stackid[0].value;
                        }
                    }
                    networkData.nodes.add({
                        'id': item.objects[2].id,
                        'label': label
                    });
                    networkData.edges.add({
                        'from': item.objects[0].id,
                        'to': item.objects[2].id,
                        'id': item.objects[1].id,
                        'label': item.objects[1].label,
                        'arrows': 'to',
                        'font': {
                            'align': 'middle'
                        }
                    });
                }
            });
        }
    }

    isPropertyNodeClicked(nodeId) {
        let index = -1;
        if (this.propertyNodes.length != 0) {
            index = _.findIndex(this.propertyNodes, (item) => {
                return item.id === nodeId;
            });
            if (index === -1) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    removeNodes(nodes, networkData) {
        nodes.forEach(item => {
            networkData.nodes.remove(item);
        });
    }

    removeEdges(edges, networkData) {
        edges.forEach(item => {
            networkData.edges.remove(item);
        });
    }
}

export default GraphService;