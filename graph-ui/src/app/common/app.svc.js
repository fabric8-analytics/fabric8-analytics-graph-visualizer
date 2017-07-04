class AppService {
    constructor($http) {
        this.$http = $http;
    }

    get(url) {
        return this.$http({
            url: url,
            method: 'GET'
        });
    }
}

export default AppService;