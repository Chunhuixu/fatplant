Promise.all([
    // fetch('./fileCyt/cy-style.json', {mode: 'no-cors'})
    //   .then(function(res) {
    //     return res.json()
    //   }),
    // fetch('./fileCyt/data.json', {mode: 'no-cors'})
    //   .then(function(res) {
    //     return res.json()
    //   })
  ])
    .then(function(dataArray) {
      var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),
  
        layout: {
          name: 'cose',
          idealEdgeLength: 100,
          nodeOverlap: 20,
          refresh: 20,
          fit: true,
          padding: 30,
          randomize: false,
          componentSpacing: 100,
          nodeRepulsion: 400000,
          edgeElasticity: 100,
          nestingFactor: 5,
          gravity: 80,
          numIter: 1000,
          initialTemp: 200,
          coolingFactor: 0.95,
          minTemp: 1.0
        },
  
        style: [{
            "selector": "core",
            "style": {
              "selection-box-color": "#AAD8FF",
              "selection-box-border-color": "#8BB0D0",
              "selection-box-opacity": "0.5"
            }
          }, {
            "selector": "node",
            "style": {
              "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
              "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
              "content": "data(name)",
              "font-size": "12px",
              "text-valign": "center",
              "text-halign": "center",
              "background-color": "#555",
              "text-outline-color": "#555",
              "text-outline-width": "2px",
              "color": "#fff",
              "overlay-padding": "6px",
              "z-index": "10"
            }
          }, {
            "selector": "node[?attr]",
            "style": {
              "shape": "rectangle",
              "background-color": "#aaa",
              "text-outline-color": "#aaa",
              "width": "16px",
              "height": "16px",
              "font-size": "6px",
              "z-index": "1"
            }
          }, {
            "selector": "node[?query]",
            "style": {
              "background-clip": "none",
              "background-fit": "contain"
            }
          }, {
            "selector": "node:selected",
            "style": {
              "border-width": "6px",
              "border-color": "#AAD8FF",
              "border-opacity": "0.5",
              "background-color": "#77828C",
              "text-outline-color": "#77828C"
            }
          }, {
            "selector": "edge",
            "style": {
              "curve-style": "haystack",
              "haystack-radius": "0.5",
              "opacity": "0.4",
              "line-color": "#bbb",
              "width": "mapData(weight, 0, 1, 1, 8)",
              "overlay-padding": "3px"
            }
          }, {
            "selector": "node.unhighlighted",
            "style": {
              "opacity": "0.2"
            }
          }, {
            "selector": "edge.unhighlighted",
            "style": {
              "opacity": "0.05"
            }
          }, {
            "selector": ".highlighted",
            "style": {
              "z-index": "999999"
            }
          }, {
            "selector": "node.highlighted",
            "style": {
              "border-width": "6px",
              "border-color": "#AAD8FF",
              "border-opacity": "0.5",
              "background-color": "#394855",
              "text-outline-color": "#394855"
            }
          }, {
            "selector": "edge.filtered",
            "style": {
              "opacity": "0"
            }
          }, {
            "selector": "edge[group=\"1\"]",
            "style": {
              "line-color": "#d0b7d5"
            }
          }, {
            "selector": "edge[group=\"2\"]",
            "style": {
              "line-color": "#a0b3dc"
            }
          }, {
            "selector": "edge[group=\"3\"]",
            "style": {
              "line-color": "#90e190"
            }
          }, {
            "selector": "edge[group=\"4\"]",
            "style": {
              "line-color": "#9bd8de"
            }
          }, {
            "selector": "edge[group=\"5\"]",
            "style": {
              "line-color": "#eaa2a2"
            }
          }, {
            "selector": "edge[group=\"6\"]",
            "style": {
              "line-color": "#f6c384"
            }
          }, {
            "selector": "edge[group=\"7\"]",
            "style": {
              "line-color": "#dad4a2"
            }
          }, {
            "selector": "edge[group=\"8\"]",
            "style": {
              "line-color": "#D0D0D0"
            }
          }, {
            "selector": "edge[group=\"9\"]",
            "style": {
              "line-color": "#D0D0D0"
            }
          }, {
            "selector": "edge[group=\"10\"]",
            "style": {
              "line-color": "#D0D0D0"
            }
          }, {
            "selector": "edge[group=\"11\"]",
            "style": {
              "line-color": "#f0ec86"
            }
          }],
  
        elements: [{
            "data": {
              "id": "605755",
              "name": "PCNA",
              "score": 1,
              "gene": true
            },
            "group": "nodes",
          }, {
            "data": {
              "id": "611408",
              "name": "FEN1",
              "score": 1,
              "gene": true
            },
            "group": "nodes"
          }, {
            "data": {
              "source": "605755",
              "target": "611408",
              "weight": 1,
              "group": "1",
            },
            "group": "edges",
          }]
      });
    });
  