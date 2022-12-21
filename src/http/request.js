const { post } = require("jquery");

const HTTP_REQUEST = (data, callback) => {
    post(data, callback);
}

module.exports = HTTP_REQUEST;