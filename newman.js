const newman = require('newman'); // require newman in your project
const fs = require('fs');

let counter = 0; // initialize counter variable

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./exported_json_from_postman.json'),
    reporters: 'cli',
    iterationData: 'all_ids.csv'
}).on('beforeRequest', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    
    if (data.request.body) {
        const requestName = data.item.name.replace(/[^a-z0-9]/gi, '-');
        const fileName = `request-${requestName}-${counter}.json`;
        counter++; // increment counter
        const content = data.request.body.raw;
        
        fs.writeFile(fileName, content, function (error) {
            if (error) { 
                 console.error(error); 
            }
         });        
    }
})
.on('request', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }

    const requestName = data.item.name.replace(/[^a-z0-9]/gi, '-');
    const fileName = `response-${requestName}-${counter}.csv`;
    counter++; // increment counter
    const content = data.response.stream.toString();
    
    
    fs.writeFile(fileName, content, function (error) {
        if (error) { 
             console.error(error); 
        }
     });

     /// TODO: all global error handling
});
