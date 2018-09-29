 const jf = require('jsonfile');
 const file = 'data.json';
 const fs = require('fs');
 var async = require('async');

 module.exports.store = (req,res) => {
    
    var file = JSON.stringify(req.body);
    var filepath = '/home/shantanu/Documents/data.json'
    // fs.appendFile(filepath, file, function (err) {
    //   if (err) console.error(err)
    // });
    

    fs.readFile(filepath,'utf8',function(err,obj){
        if(err) console.log(err);
    //     var content = obj.split('}');
    // async.map(content, function (item, callback) {
    //     callback(null, JSON.parse(item));
    // }, function (err, content) {
    //     console.log(content);
    // });

        console.log(obj);
        
    });
    // jf.writeFile(filepath,req.body,{flag: 'a'},function (err) {
    //       if (err) console.error(err)
    //     })


 }

 module.exports.fetch = (req,res) => {

 }