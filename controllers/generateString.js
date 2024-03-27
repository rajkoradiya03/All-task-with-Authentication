function generateString(length, charSet) {
    let str = "";
    for(let i = 0; i < length; i++){
        str += charSet[Math.floor(Math.random() * charSet.length)];
    }
    return str;
}

module.exports = generateString;