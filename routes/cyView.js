var express = require('express');
var router = express.Router();
var fs = require('fs');


const csvFilePath='./fileCyt/example.csv';
const csv=require('csvtojson');


var jsonString;

var edgeModel=[ { data: { id: 'GO:0009292' }, position: { x: 0, y: 0 } },
    { data: { id: 'GO:0044728' }, position: { x: 0, y: 300 } },
    { data:
            { id: '01',
                source: 'GO:0009292',
                label: 'top left',
                target: 'GO:0044728' } }
]


router.get('/', function(req, res, next) {
    res.render('dataPages/cytView', {
        title: 'Cytoscape',

    });
});


router.get('/data',  function (req, res, next) {

    //---csv data template start--

    // { SUID: '3978',
//     BEND_MAP_ID: '1129198',
//     Gene_A: 'GO:0051276',
//     Gene_B: 'GO:0071103',
//     interaction: 'Direct',
//     name: '',
//     Name_A: 'GO:0051276',
//     Name_B: 'GO:0071103',
//     SCORE: '0.441367118',
//     selected: 'FALSE',
//     'shared interaction': 'Direct',
//     'shared name': '',
//     source: '124',
//     source_original: '',
//     target: '107',
//     target_original: '',
//     TYPE: 'Direct' },
    // -- csv data end---

    csv().fromFile(csvFilePath)
        .then((jsonObj)=>{
            var datas=[];
            //number of object
            for (var i=0;i<5;i++){
            //node a
            var data1 = {};
            var nodeModel1= {};
            data1["id"] = jsonObj[i].Gene_A;
            nodeModel1["data"] =data1;
            datas.push(nodeModel1);

            //node b
            var data2 = {};
            var nodeModel2= {};
            data2["id"] = jsonObj[i].Gene_B;
            nodeModel2["data"] =data2;
            datas.push(nodeModel2);

            //edge
            var data3 ={};
            var nodeModel3= {};
            data3["id"] = "e"+i;
            data3["source"] = jsonObj[i].Gene_A;
            data3["label"] = jsonObj[i].SCORE;
            data3["target"] = jsonObj[i].Gene_B;
            nodeModel3["data"] =data3;
            datas.push(nodeModel3);

            }

            // -- elements template start--

            // var elementsdata = [ // list of graph elements to start with
            //
            //
            //     { // node a
            //         "data": { "id": 'GO:0009292' }, "position": { x: 0, y: 0},
            //
            //     },
            //
            //     { // node b
            //         "data": {  id: 'GO:0044728' },  position: { x: 0, y: 300 },
            //     },
            //     { // edge ab
            //         data: { id: '01', source: 'GO:0009292',label: 'top left' , target: 'GO:0044728' }
            //     }
            // ];
           // console.log(elementsdata);
            // --elemenrs template end ----

            res.send(datas);

        })





});


module.exports = router;
