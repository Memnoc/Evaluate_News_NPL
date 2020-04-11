/**
 * Scope: This function runs a regex check against the user input
 * @param {string} url A user-input URL
 * 
 */



function urlValidate(url) {
    const reg = /^(https?:\/\/)?(\w+\.)?(\w+\.)(\w+)([\w\?\&\=\-]?)*(\/[\w\?\&\=\-]*)*$/g
    if (reg.test(url)) {
        return true;
    } else {
        return false;
    }
};

export { urlValidate }