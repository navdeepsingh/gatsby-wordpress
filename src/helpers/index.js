const helpers = {};

helpers.chunkArray = (array, chunk_size) => {
    return Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));
}


module.exports = helpers;