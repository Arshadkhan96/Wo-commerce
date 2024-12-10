class ApiFeatures {
    constructor(query,urlQuery) {
        this.query = query;
        this.urlQuery = urlQuery;

    }
    search() {
        const keyword = this.urlQuery.keyword
            ? {
                name: {
                    $regex: this.urlQuery.keyword,
                    $options: 'i'
                }
            } : {};
        this.query = this.query.find({...keyword});
        return this;
    };
} 

module.exports = ApiFeatures;