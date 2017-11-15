import vis from 'vis';

class VisualizationController {
    constructor(appConstants, gremlinQueryService, appService, gremlinService) {
        this.constants = appConstants;
        this.gremlinQueryService = gremlinQueryService;
        this.appService = appService;
        this.gremlinService = gremlinService;
        this.options = {
            physics: {
                stabilization: true,
                barnesHut: {
                    gravitationalConstant: -5000,
                    centralGravity: 2,
                    springLength: 150,
                    springConstant: 0.50,
                    damping: 0.62,
                    avoidOverlap: 0.6
                },
                enabled: true,
                minVelocity: 0.75
            },
            interaction: {
                navigationButtons: true,
                keyboard: false,
                hover: true
            },
            edges: {
                smooth: {
                    forceDirection: 'none',
                    roundness: 0
                }
            }
        };
        this.network = null;
        this.networkContainer = null;
        this.networkDataOriginal = null;
        this.networkDataCurrent = null;
        this.doubleClicktime = 0;
        this.clickThresold = 2000;
    }

    $onChanges() {
        if (this.gremlinquery) {
            this.appService.get(this.gremlinquery)
                .then(response => {
                    this.gremlinService.getGraphDataForPackages(response)
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
        this.networkContainer = document.getElementById('network-container');
        this.network = new vis.Network(this.networkContainer, data, this.options);
        this.network.on("selectNode", this.networkNodeSelectHandler.bind(this));
        this.network.on("doubleClick", this.networkDoubleClickHandler.bind(this));
        this.network.on("click", this.networkClickHandler.bind(this));
    }

    setBackupData(data) {
        this.networkDataOriginal = data;
        this.networkDataCurrent = data;
    }

    networkNodeSelectHandler(params) {
        let t0 = new Date();
        if (t0 - this.doubleClicktime > this.clickThresold) {
            setTimeout(() => {
                if (t0 - this.doubleClicktime > this.clickThresold) {
                    this.selectNode(params);
                }
            }, this.clickThresold);
        }
    }

    selectNode(params) {
        let isNodeClicked = this.network.getNodeAt(params.pointer.DOM);
        let nodeId = params.nodes[0];
        let isPropertyNodeClicked = this.gremlinService.isPropertyNodeClicked(nodeId);
        if (isNodeClicked && nodeId && !isPropertyNodeClicked) {
            this.showPropertyNodes(nodeId);
        }
    }

    showPropertyNodes(nodeId) {
        this.gremlinQueryService.buildNodeFetchQuery(nodeId);
        this.appService.get(this.gremlinQueryService.getNodeById)
            .then(response => {
                this.gremlinService.getPropertyNodes(response, this.networkDataCurrent);
            });
    }

    networkDoubleClickHandler(params) {
        this.doubleClicktime = new Date();
        this.removePropertyNodes();
        let isNodeClicked = this.network.getNodeAt(params.pointer.DOM);
        let nodeId = params.nodes[0];
        let isPropertyNodeClicked = this.gremlinService.isPropertyNodeClicked(nodeId);
        if (isNodeClicked && nodeId && !isPropertyNodeClicked) {
            this.showAdjacentNodes(nodeId);
        }
    };

    showAdjacentNodes(nodeId) {
        this.gremlinQueryService.buildAdjacentNodesFetchQuery(nodeId);
        this.appService.get(this.gremlinQueryService.getAdjacentNodes)
            .then(response => {
                this.gremlinService.getAdjacentNodes(nodeId, response, this.networkDataCurrent);
            });
    }

    networkClickHandler(params) {
        if (params.nodes.length === 0 && params.edges.length === 0) {
            this.removePropertyNodes();
        }
    };

    removePropertyNodes() {
        this.gremlinService.removeNodes(this.gremlinService.propertyNodes, this.networkDataCurrent);
        this.gremlinService.removeEdges(this.gremlinService.propertyEdges, this.networkDataCurrent);
    }
}

export default VisualizationController;