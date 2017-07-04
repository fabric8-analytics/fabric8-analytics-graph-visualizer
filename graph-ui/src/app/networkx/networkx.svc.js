import vis from 'vis';

class GraphService {
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
            if (jsonData.data.node_list && jsonData.data.node_list.length > 0) {
                jsonData.data.node_list.forEach((item, index) => {
                    if (!this.appFactory.isItemPushed(item.id, this.networkData.nodes)) {
                        this.networkData.nodes.add({
                            id: item,
                            title: item
                        });
                    }
                });
            }
            if (jsonData.data.kronos_viz_edge_list && jsonData.data.kronos_viz_edge_list.length > 0) {
                jsonData.data.kronos_viz_edge_list.forEach((item, index) => {
                    if (!this.appFactory.isItemPushed(item.id, this.networkData.edges)) {
                        this.networkData.edges.add({
                            id: item.from + '-to-' + item.to,
                            temp: 'E' + index,
                            from: item.from,
                            to: item.to,
                            arrows: 'to',
                            font: {
                                align: 'middle'
                            },
                            title: item.from + ' TO ' + item.to
                        });
                    }
                });
            }
            resolve(this.networkData);
        });
    }
}

export default GraphService;