const convert = require('xml-js');
const fs = require('fs');

const CREATE_TEST_SUITE = { _attributes: 
   { 
     name: 'ReactJs Test Coverage',
     errors: '0',
     package: 'ReactJs Test Coverage',
     hostname: 'localhost',
     tests: '0',
     failures: '0',
     time: '0.111',
     timestamp: '' },
  properties: {},
  testcase: 
   [ ],
  'system-out': {},
  'system-err': {} }



const FAILURE_TO_WRITE = {
    "_attributes": {
      "name": "ReactJs Test Coverage",
      "time": "0",
      "classname": "Coverage failure"
    },
    "failure": {
      "_attributes": {
        "type": ""
      },
      "_text": "Missing Test Coverage "
    }
  }

 const SUCCESS_TO_WRITE = {
    "_attributes": {
      "name"  :"ReactJs Test Coverage",
      "time":"0",
      "classname": "Coverage success"
    }
 }

 const FAILURE_ESLINT_TO_WRITE = {
    "_attributes": {
      "name"  :"ReactJs Eslint errors",
      "time":"0",
      "classname": "Eslint error"
    },
    "failure": {
      "_attributes": {
        "type": ""
      },
      "_text": "Eslint error"
    }
 }

 const SUCCESS_ESLINT_TO_WRITE = {
    "_attributes": {
      "name" :"ReactJs Lint Coverage",
      "time":"0",
      "classname": "Eslint success"
    } 
 }

let readUnitXML = readXML('./test-report.xml');
let readCloverXML = readXML('./coverage/clover.xml');
// let readlintXML = readXML('./eslint.xml');

Promise.all([readUnitXML , readCloverXML]).then(data => {
    let unitJSON = convertXML2JS(data[0]);
    let cloverJSON = convertXML2JS(data[1]);
    // let lintJSON = convertXML2JS(data[2]);

   
    let cloverResults = getCloverCount(cloverJSON);
    // let lintResults = getlintCount(lintJSON);
    let unitResults = getUnitCount(unitJSON , cloverResults);
    
    
    let unitResultXML = converJS2XML(unitResults);

    fs.writeFile('./unit.xml',unitResultXML , function(err){
        if(err) throw err;
    });

    
}).catch(err => {
    console.log(err);
})

function converJS2XML(json){
    let options = {ignoreComment:true , spaces:4 , compact:true};
    return convert.js2xml(json, options);
}

function convertXML2JS(xml){
    return convert.xml2js(xml , {compact:true , spaces: 4});
}



function readXML(path){
    return new Promise(function(resolve , reject){
        fs.readFile(path , 'utf-8' , (err , data) =>{
            if(err) return reject(err);
            else return resolve(data);           
        })
    });
}

function getCloverCount(cloverJson){
    // console.log(JSON.stringify(cloverJson));
    const metrics = cloverJson.coverage.project.metrics;
    const unconveredStatements = parseInt(metrics._attributes.statements) - parseInt(metrics._attributes.coveredstatements);

    return {
        totalStatements:parseInt(metrics._attributes.statements),
        coveredStatements:parseInt(metrics._attributes.coveredstatements),
        unconveredStatements
    }
}

// function getlintCount(lintJson){
//     let err_count=0;
//     let lint_err_count=0;
//     let lint_success_marigin = 10;
//     let lint_success_count = 0;
//     const testsuite_count = lintJson.testsuites.testsuite;
//     for (i = 0; i < testsuite_count.length; i++) {
//       err_count = err_count + parseInt(lintJson.testsuites.testsuite[i]._attributes.errors);
//     }


//      if(err_count > 0){
//       if(err_count <= 10) { lint_err_count = 1; }
//       if(err_count >= 10 && err_count <= 20){ lint_err_count = 2;}
//       if(err_count >= 20 && err_count <= 30){ lint_err_count = 3;}
//       if(err_count >= 30 && err_count <= 40){ lint_err_count = 4;}
//       if(err_count >= 40 && err_count <= 50){ lint_err_count = 5;}
//       if(err_count >= 50 && err_count <= 60){ lint_err_count = 6;}
//       if(err_count >= 60 && err_count <= 70){ lint_err_count = 7;}
//       if(err_count >= 70 && err_count <= 80){ lint_err_count = 8;}
//       if(err_count >= 80 && err_count <= 90){ lint_err_count = 9;}
//       if(err_count > 90){ lint_err_count = 10;}
//     }
//     lint_success_count = lint_success_marigin - lint_err_count
//     // console.log("err_count",err_count);
//     return {
//       lint_err_count:lint_err_count,
//       lint_success_count:lint_success_count
//     }
// }

function getUnitCount(unitJson , cloverResults ){
   
     const testsuite_count_unit = unitJson.testsuites.testsuite.length;
     let total=0
     let failures=0

    // let failurelintCount = lintResults.lint_err_count;
    // let successlintcount = lintResults.lint_success_count;    

    let totalUnitClover =   cloverResults.totalStatements;
    let totalfailure =  cloverResults.unconveredStatements;
    let successUnitClover = cloverResults.coveredStatements;
    let failureUnitClover = cloverResults.unconveredStatements;


    const unitJsonResult = JSON.parse(JSON.stringify(unitJson)); //for deep copy as Object.assign doesn't support deep copy..



    unitJsonResult.testsuites.testsuite.push(CREATE_TEST_SUITE)
    unitJsonResult.testsuites.testsuite[testsuite_count_unit]._attributes.id = testsuite_count_unit;
    unitJsonResult.testsuites.testsuite[testsuite_count_unit]._attributes.tests = totalUnitClover;
    
    unitJsonResult.testsuites.testsuite[testsuite_count_unit]._attributes.failures = totalfailure;


    
    if(failureUnitClover > 0){

      for(var i=0;i < failureUnitClover;i++){

        unitJsonResult.testsuites.testsuite[testsuite_count_unit].testcase.push(FAILURE_TO_WRITE);
      }
    }
    if(successUnitClover > 0){
      for(var j=0;j< successUnitClover;j++){
        
        unitJsonResult.testsuites.testsuite[testsuite_count_unit].testcase.push(SUCCESS_TO_WRITE);
        
      }
    }

 
    // if(successlintcount > 0){
    //     for(let i=0;i<successlintcount;i++){
    //         unitJsonResult.testsuites.testsuite[testsuite_count_unit].testcase.push(SUCCESS_ESLINT_TO_WRITE);
    //   }
    // }     

    // if(failurelintCount > 0){
    //     for(let i=0;i<failurelintCount;i++){
    //         unitJsonResult.testsuites.testsuite[testsuite_count_unit].testcase.push(FAILURE_ESLINT_TO_WRITE);
    //   }
    // }    

    return unitJsonResult;
}