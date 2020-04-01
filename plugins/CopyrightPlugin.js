const fs = require('fs')

class CopyrightPlugin{

    constructor({filename}){
        this.filename = filename;
    }

    apply(compiler){
        compiler.hooks.emit.tap('CopyrightPlugin', 
        (compilation)=>{
            let assets = compilation.assets;
            let content = `##版权详情\r\n`;    
            const that = this;        
            fs.readFile('./package.json',(err,data)=>{
                if(err){
                    console.log(err)
                    return
                }
                const newdata = JSON.parse(data);
                let { name , version, author, license} = newdata ;
                author = author==''? 'author-test' : author ;
                let copyright = { name , version, author, license};
                Object.entries(copyright).forEach(([item, detail])=>{
                    content += `- ${item} :    ${detail}\r\n`;
                })
                assets[that.filename] = {
                source(){
                    return content
                },
                size(){
                    return content.length
                }
            }
            })
        })
    }


    getCopyright(){
        return new Promise((resolve,reject)=>{
            fs.readFile('./package.json',resolve (data,err))
        })
    }
}

module.exports = CopyrightPlugin