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
                    if (!this.appFactory.isItemPushed(item.id, networkData.nodes)) {
                        let pkgName = '';
                        if (item.properties.name) {
                            pkgName = item.properties.name[0].value;
                        } else if (item.properties.pname) {
                            pkgName = item.properties.pname[0].value;
                        }
                        networkData.nodes.add({
                            id: item.id,
                            label: pkgName
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
                    if (!this.appFactory.isItemPushed(propertyNodeId, networkData.nodes)) {
                        networkData.nodes.add({
                            id: propertyNodeId,
                            label: key,
                            shape: 'dot',
                            size: 10,
                            title: propertyNodeValue
                        });
                        networkData.edges.add({
                            from: item.id,
                            label: 'isProperty',
                            to: propertyNodeId,
                            id: propertyEdgeId,
                            font: {
                                align: 'middle'
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
                if (!this.appFactory.isItemPushed(item.objects[2].id, networkData.nodes)) {
                    networkData.nodes.add({
                        id: item.objects[2].id,
                        label: item.objects[2].properties.version[0].value
                    });
                    networkData.edges.add({
                        from: item.objects[0].id,
                        to: item.objects[2].id,
                        id: item.objects[1].id,
                        label: item.objects[1].label,
                        arrows: 'to',
                        font: {
                            align: 'middle'
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