import vis from 'vis';

class VisualizationController {
    constructor(appConstants, appService, kronosService) {
        this.constants = appConstants;
        this.appService = appService;
        this.kronosService = kronosService;

        this.options = {
            physics: {
                stabilization: false
            },
            interaction: {
                navigationButtons: true,
                keyboard: true,
                hover: true
            },
            nodes: {
                shape: 'dot',
                size: 10
            },
            edges: {
                smooth: {
                    forceDirection: 'none',
                    roundness: 1,
                    type: 'continuous'
                }
            }
        };
        this.network = null;
        this.networkDataOriginal = null;
        this.networkDataCurrent = null;
        this.filterText = null;
    }

    $onChanges() {
        if (this.host) {
            this.appService.get(this.host)
                .then(response => {
                    console.log('response : ', response);
                    this.kronosService.getNetworkData(response)
                        .then(response => {
                            this.formNetworkVisualization(response);
                        });
                })
                .catch(error => {
                    console.log('error', error);
                });
        }
    }

    formNetworkVisualization(data) {
        this.setBackupData(data);
        this.networkContainer = document.getElementById('kronos-container');
        this.network = new vis.Network(this.networkContainer, data, this.options);
    }

    setBackupData(data) {
        this.networkDataOriginal = data;
        this.networkDataCurrent = data;
    }

    filter() {
        let filterText = this.filterText;
        let filteredNodes = this.networkDataOriginal.nodes.get({
            filter: item => {
                return (item.id.indexOf(filterText) > -1);
            }
        });
        let filteredEdges = this.networkDataOriginal.edges.get({
            filter: item => {
                return (item.temp.indexOf(filterText) > -1);
            }
        });

        let otherNodes = [];
        let otherEdges = [];
        filteredNodes.forEach((item, index) => {
            item.color = {
                background: '#337ab7',
                border: '#2e6da4'
            }
            this.addIncomingNodes(item, filteredNodes, filteredEdges, otherNodes, otherEdges);
        });
        filteredNodes = filteredNodes.concat(otherNodes);
        filteredEdges = filteredEdges.concat(otherEdges);

        this.networkDataCurrent = this.getDataSetFormat(filteredNodes, filteredEdges);
        this.network.setData(this.networkDataCurrent);
    }

    addIncomingNodes(node, filteredNodes, filteredEdges, otherNodes, otherEdges) {
        this.networkDataCurrent.edges.forEach(edge => {
            let nodeToCheck = this.networkDataCurrent.nodes.get(edge.to);
            if (node.id === nodeToCheck.id) {
                let nodeToPush = this.networkDataCurrent.nodes.get(edge.from);
                if (!this.ifNodeExist(nodeToPush, filteredNodes, otherNodes)) {
                    otherNodes.push(nodeToPush);
                }
                if (!this.ifEdgeExist(edge, filteredEdges, otherEdges)) {
                    otherEdges.push(edge);
                }
            }
        });
    }

    getDataSetFormat(nodes, edges) {
        let nodeDataSet = new vis.DataSet({});
        nodeDataSet.add(nodes);
        let edgeDataSet = new vis.DataSet({});
        edgeDataSet.add(edges);

        return {
            nodes: nodeDataSet,
            edges: edgeDataSet
        };
    }

    ifNodeExist(node, filteredNodes, otherNodes) {
        let bool = false;
        filteredNodes.forEach(function (item) {
            if (item.id === node.id) {
                bool = true;
            }
        });
        otherNodes.forEach(function (item) {
            if (item.id === node.id) {
                bool = true;
            }
        });
        return bool;
    }

    ifEdgeExist(edge, filteredEdges, otherEdges) {
        let bool = false;
        filteredEdges.forEach(function (item) {
            if (item.id === edge.id) {
                bool = true;
            }
        });
        otherEdges.forEach(function (item) {
            if (item.id === edge.id) {
                bool = true;
            }
        });
        return bool;
    }

    reset() {
        this.filterText = '';
        this.network.setData(this.networkDataOriginal);
    }
}

export default VisualizationController;