import vis from 'vis';

class KronosService {
    constructor(appFactory) {
        this.appFactory = appFactory;
        this.networkData = null;
    }

    getNetworkData(data) {
        this.networkData = {
            nodes: new vis.DataSet(),
            edges: new vis.DataSet()
        };
        return new Promise((resolve, reject) => {
            let jsonData = data;
            if (data && typeof data === 'string') {
                jsonData = JSON.parse(data);
            }
            if (jsonData.data && jsonData.data.length > 0) {
                jsonData.data.forEach((item, index) => {
                    let fromNodeId = item['from'];
                    if (!this.appFactory.isNodeExistsInDataset(fromNodeId, 'id', this.networkData.nodes)) {
                        this.networkData.nodes.add({
                            id: fromNodeId,
                            title: fromNodeId
                        });
                    }

                    let toNodeId = item['to'];
                    if (!this.appFactory.isNodeExistsInDataset(toNodeId, 'id', this.networkData.nodes)) {
                        this.networkData.nodes.add({
                            id: toNodeId,
                            title: toNodeId
                        });
                    }

                    let edgeId = fromNodeId + '-to-' + toNodeId;
                    if (!this.appFactory.isNodeExistsInDataset(edgeId, 'id', this.networkData.edges)) {
                        this.networkData.edges.add({
                            id: edgeId,
                            temp: 'E' + index,
                            from: fromNodeId,
                            to: toNodeId,
                            arrows: 'to',
                            font: {
                                align: 'middle'
                            },
                            title: '<span>' + fromNodeId + '<b> TO </b>' + toNodeId + '</span>'
                        });
                    }
                });
            }
            resolve(this.networkData);
        });
    }

    replaceStringInList(stringToRemove, stringToReplaceWith, list) {
        if (list.data && list.data.length > 0) {
            list.data.forEach((item, index) => {
                if (typeof item === 'string') {
                    item.replace(stringToRemove, stringToReplaceWith);
                } else {
                    for (let key in item) {
                        if (item.hasOwnProperty(key)) {
                            item[key] = item[key].replace(stringToRemove, stringToReplaceWith);
                        }
                    }
                }
            });
        }
    }
}

export default KronosService;