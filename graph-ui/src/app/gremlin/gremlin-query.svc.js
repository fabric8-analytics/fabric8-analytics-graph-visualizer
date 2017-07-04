class GremlinQueryService {
    constructor() {
        this.hostString = '';
        this.tokenNames = '';
        this.keyValues = [];
        this.getNodes = null;
        this.getNodeById = null;
        this.getAdjacentNodes = null;
        this.queryStringObj = {
            getNodes: {
                part1: '/?gremlin=g.V()',
                part2: '.has("',
                part3: '","',
                part4: '")',
                part5: '.has("tokens","',
                part6: '")',
                part7: '.limit(50)'
            },
            getNodeById: {
                part1: '/?gremlin=g.V(',
                part2: ')'
            },
            getAdjacentNodes: {
                part1: '/?gremlin=g.V(',
                part2: ').bothE().otherV().path()'
            }
        }
    }

    convertTokenStrToArr() {
        let tokenArray = [];
        if (this.tokenNames) {
            this.tokenNames.split(' ').forEach(item => {
                tokenArray.push(item.trim());
            });
        }
        this.tokenNames = tokenArray;
    }

    buildNodesFetchGremlinQuery() {
        this.getNodes = this.hostString + this.queryStringObj.getNodes.part1;
        this.keyValues.forEach(item => {
            if (item.key) {
                this.getNodes += this.queryStringObj.getNodes.part2 + item.key + this.queryStringObj.getNodes.part3 + item.value + this.queryStringObj.getNodes.part4;
            }
        });
        this.tokenNames.forEach(item => {
            if (item) {
                this.getNodes += this.queryStringObj.getNodes.part5 + item + this.queryStringObj.getNodes.part6;
            }
        });
        this.getNodes += this.queryStringObj.getNodes.part7;
    }

    buildNodesFetchQuery(hostString, tokenString, keyValues) {
        this.hostString = hostString;
        this.tokenNames = tokenString;
        this.keyValues = keyValues;
        this.convertTokenStrToArr();
        this.buildNodesFetchGremlinQuery();
    }

    buildNodeFetchQuery(nodeId) {
        this.getNodeById = this.hostString + this.queryStringObj.getNodeById.part1 + nodeId + this.queryStringObj.getNodeById.part2;
    }

    buildAdjacentNodesFetchQuery(nodeId) {
        this.getAdjacentNodes = this.hostString + this.queryStringObj.getAdjacentNodes.part1 + nodeId + this.queryStringObj.getAdjacentNodes.part2;
    }
}

export default GremlinQueryService;