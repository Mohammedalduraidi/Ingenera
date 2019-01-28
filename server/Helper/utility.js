

/*
  * This function for checking the body object,
  * that coming from client and remove an empty elements
*/

exports.EditAndValidate = (obj, array) => {
    let result = {};
    for (let index = 0; index < array.length; index++) {
        let element = array[index];
        if (obj[element] && obj[element] !== '' && !obj[element].length) {
            result[element] = obj[element];
        }
        if (obj[element] && obj[element].length > 0) {
            result[element] = obj[element];
        }
    }
    return result;
};