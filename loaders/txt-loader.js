function strLoader (source){
    return source.replace(this.query.targetstr,this.query.newstr)
}

module.exports = strLoader;