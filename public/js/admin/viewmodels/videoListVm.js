angular.module('Teach4Tech.Admin.Viewmodels')
  .factory('VideoListVm', [function(){
  	return function(){

  		this.gridConfig = {
                        dataSource: {
                            data: [{
							  	ProductName: 'asdas',
								UnitPrice: 1003,
								UnitsInStock: 2,
								Discontinued: true
                            }, {
								ProductName: 'asdas',
								UnitPrice: 1003,
								UnitsInStock: 2,
								Discontinued: true
                            }, {
								ProductName: 'asdas',
								UnitPrice: 1003,
								UnitsInStock: 2,
								Discontinued: true
                            }, {
								ProductName: 'asdas',
								UnitPrice: 1003,
								UnitsInStock: 2,
								Discontinued: true
                            }],
                            schema: {
                                model: {
                                    fields: {
                                        ProductName: { type: "string" },
                                        UnitPrice: { type: "number" },
                                        UnitsInStock: { type: "number" },
                                        Discontinued: { type: "boolean" }
                                    }
                                }
                            },
                            pageSize: 20
                        },
                        height: 430,
                        scrollable: true,
                        sortable: true,
                        filterable: true,
                        pageable: {
                            input: true,
                            numeric: false
                        },
                        columns: [
                            "ProductName",
                            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
                            { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
                            { field: "Discontinued", width: "130px" }
                        ]
                    };
  	};
  }]);