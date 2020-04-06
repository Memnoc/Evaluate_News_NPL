function urlValidate(url) {
    const reg = /^(https?:\/\/)?(\w+\.)?(\w+\.)(\w+)([\w\?\&\=\-]?)*(\/[\w\?\&\=\-]*)*$/g
    if (reg.test(url)) {
        return true;
    } else {
        return false;
    }
};

export { urlValidate }