class KronosController {
    constructor(appConstants, appService, kronosService) {
        this.constants = appConstants;
        this.appService = appService;
        this.kronosService = kronosService;
        this.host = null;
    }
}

export default KronosController;