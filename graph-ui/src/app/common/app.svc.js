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

    post(url, data) {
        return this.$http({
            url: url,
            method: 'POST',
            data: data || null
        });
    }
}

export default AppService;