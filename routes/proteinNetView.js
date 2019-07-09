var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('../db/db.js');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));



const csvFilePath='./fileCyt/protein-interactions.csv';
// const csvEntityTableFilePath = './fileCyt/GO_AllLists.csv'
const csv=require('csvtojson');

router.get('/', function(req, res, next) {
    res.render('dataPages/proteinNetView', {
        title: 'Protein-Protein Network',

    });
});

router.get('/data',  function (req, res, next) {

    console.log("hello");

    csv().fromFile(csvFilePath)
        .then((jsonObj)=>{
            var elements=[];
            var genes=[];
            var groupNum = 1;
            //number of object
            console.log()
            for (var i=0;i<jsonObj.length;i++){

                if(groupNum > 11){
                    groupNum = 1;
                }

                let node1 = jsonObj[i].node1;
                let node2 = jsonObj[i].node2;
                if(!node1){
                    continue;
                }
                else if(!node2){
                    continue;
                }

                // if node not already mapped
                if(!genes.includes(node1)){
                    genes.push(node1)

                    // node a
                    var data = {};
                    var nodeModel= {};
                    data["id"] = node1;
                    data["name"] = node1;
                    data["score"] = 0;
                    data["gene"] = true;
                    nodeModel["data"] =data;
                    nodeModel["group"] = "nodes"
                    elements.push(nodeModel);

                }

                // if node not already mapped
                if(!genes.includes(node2)){
                    genes.push(node2)

                    //node b
                    var data = {};
                    var nodeModel= {};
                    data["id"] = node2;
                    data["name"] = node2;
                    data["score"] = 0;
                    data["gene"] = true;
                    nodeModel["data"] =data;
                    nodeModel["group"] = "nodes"
                    elements.push(nodeModel);
                }

                for(var j=0; j<elements.length;j++){
                    var tempModel = elements[j]
                    if(tempModel["data"]["name"] == node2){
                        tempModel["data"]["score"] += .0004;
                    }
                    else if(tempModel["data"]["name"] == node1){
                        tempModel["data"]["score"] += .0004;
                    }
                }

                // edge
                var data ={};
                var nodeModel= {};
                data["source"]=node1;
                data["target"]=node2;
                data["weight"]=jsonObj[i].combined_score / 1.2;
                data["group"]= groupNum.toString();
                nodeModel["data"] =data;
                nodeModel["group"] = "edges"
                elements.push(nodeModel);

                groupNum++;
            }

            res.send(elements);

        })
});


module.exports = router;
