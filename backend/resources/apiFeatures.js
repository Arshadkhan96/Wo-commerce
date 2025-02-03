class ApiFeatures {
  constructor(query, urlQuery) {
    this.query = query;
    this.urlQuery = urlQuery;
  }
  search() {
    const keyword = this.urlQuery.keyword
      ? {
          name: {
            $regex: this.urlQuery.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.urlQuery };
    const garbageValue = ["keyword","page","limit"];
    garbageValue.forEach((e) => {
      delete queryCopy[e];
    });
    this.query = this.query.find(queryCopy);
    return this;
  }
    pagination(productPerPage) {
        const currentStatusPage = Number(this.urlQuery.page) || 1;
        const skipp = productPerPage * (currentStatusPage - 1); 
        this.query = this.query.limit(productPerPage).skip(skipp);
        return this;
  }
} 

module.exports = ApiFeatures;