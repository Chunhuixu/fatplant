$(document).foundation();
    $(document).ready(function () {

        $("#cy").hide();

        $.get({
            // getting the data
            url: '/protein-network/data',
            success: function (data) {
                $("#loading").hide();
                $("#cy").show();

                var elementsdata = data;
                var cy = window.cy = cytoscape({

                    pixelRatio: 1,
                    hideEdgesOnViewport: true,
                    textureOnViewport: true,
                    container: document.getElementById('cy'),
                    elements: elementsdata,
                    autounselectify: true,
                    boxSelectionEnabled: false,

                });

                document.getElementById('layout1').addEventListener('click', function(){

                    cy.stop()
                    cy.clearQueue()

                    function changeLayout(callback) {
                        cy.startBatch();

                        var layout = cy.layout({
                            name: 'cose',
                            idealEdgeLength: 500,
                            nodeOverlap: 200,
                            refresh: 10,
                            fit: true,
                            padding: 30,
                            randomize: false,
                            componentSpacing: 100,
                            nodeRepulsion: 400000000,
                            edgeElasticity: 100,
                            nestingFactor: 5,
                            gravity: 80,
                            numIter: 1000,
                            initialTemp: 200,
                            coolingFactor: 0.95,
                            minTemp: 1.0
                        });
                        layout.run();

                        callback();
                    }
                    
                    changeLayout(function() {
                        cy.endBatch();
                        cy.stop()
                        cy.clearQueue()
                    });

                    $('.button').removeClass('disabled')
                    $(this).addClass('disabled')

                    cy.stop()
                    cy.clearQueue()

                    cy.style()
                        .resetToDefault() // start a fresh default stylesheet
                        .fromJson([
                            {
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
                            },
                            {
                                "selector": "edge",
                                "style": {
                                "opacity": ".3",
                                "width": "mapData(weight, 0, 1, 1, 8)",
                                "line-color": "#d0b7d5"
                                }
                            }
                        ])
                        .update() // indicate the end of your new stylesheet so that it can be updated on elements
                    ;

                });

                document.getElementById('layout2').addEventListener('click', function(){

                    cy.stop()
                    cy.clearQueue()


                    function changeLayout(callback) {
                        cy.startBatch();

                        var layout = cy.layout({
                            name: 'cola',
                            maxSimulationTime: 3000,
                        });
                        layout.run();

                        callback();
                    }
                    
                    changeLayout(function() {
                        cy.endBatch();
                        cy.stop()
                        cy.clearQueue()
                    });

                    $('.button').removeClass('disabled')
                    $(this).addClass('disabled')

                    cy.stop()
                    cy.clearQueue()

                });

                document.getElementById('layout3').addEventListener('click', function(){

                    cy.stop()
                    cy.clearQueue()

                    function changeLayout(callback) {
                        cy.startBatch();

                        var layout = cy.layout({
                            name: 'circle'
                        });
                        layout.run();

                        callback();
                    }
                    
                    changeLayout(function() {
                        cy.endBatch();
                        cy.stop()
                        cy.clearQueue()
                    });

                    $('.button').removeClass('disabled')
                    $(this).addClass('disabled')

                    cy.stop()
                    cy.clearQueue()

                });

                document.getElementById('layout4').addEventListener('click', function(){

                    cy.stop()
                    cy.clearQueue()

                    function changeLayout(callback) {
                        cy.startBatch();

                        var layout = cy.layout({
                            name: 'concentric',
                            concentric: function( node ){
                                return node.degree();
                            },
                            levelWidth: function( nodes ){
                                return 2;
                            }
                        });
                        layout.run();

                        callback();
                    }
                    
                    changeLayout(function() {
                        cy.endBatch();
                        cy.stop()
                        cy.clearQueue()
                    });

                    $('.button').removeClass('disabled')
                    $(this).addClass('disabled')

                    cy.stop()
                    cy.clearQueue()

                });

                // document.getElementById('layout5').addEventListener('click', function(){

                //     cy.stop()
                //     cy.clearQueue()

                //     function changeLayout(callback) {
                //         cy.startBatch();

                //         var layout = cy.layout({
                //             name: 'avsdf',
                //             nodeSeparation: 120
                //         });
                //         layout.run();

                //         callback();
                //     }
                    
                //     changeLayout(function() {
                //         cy.endBatch();
                //         cy.stop()
                //         cy.clearQueue()
                //     });

                //     $('.button').removeClass('disabled')
                //     $(this).addClass('disabled')

                //     cy.stop()
                //     cy.clearQueue()

                // });

                $('#layout1').trigger('click');
            }
        })
    });