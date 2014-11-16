angular.module('Teach4Tech.Admin.Viewmodels')
  .factory('VideoListVm', [function(){
  	return function(){

  		this.gridConfig = {
          dataSource: {
            type: 'json',
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize: 10,
            transport: {
              read: { url: "api/admin/video/search", dataType: "json", type: 'GET' }
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  id: { editable: false },
                  title: { type: 'string', validation: { required: true } },
                  length: { type: 'string', validation: { required: true } },
                  author: { type: 'string', validation: { required: true } },
                  date: { type: 'date', validation: { required: true } },
                  hidden: { type: 'boolean' },
                }
              },
              data: "data",
              total: "total"
        	},
          },
          height: 400,
          scrollable: true,
          sortable: {
            mode: "multiple",
            allowUnsort: true
          },
          filterable: false,
          pageable: {
            input: true,
            refresh: true,
            pageSizes: true,
            numeric: true,
          },
          editable: false,
          selectable: false,
          columns: [
            { field: "title", title: "Название" },
            { field: "length", title: "Длина" },
            { field: "author", title: "Автор" },
            { field: "date", title: "Дата", template: '#= kendo.toString(kendo.parseDate(date), "MM/dd/yyyy" ) #' },
            { field: "hidden", title: "Скрытое?", template: '#= hidden == true ? "Да" : "Нет" #' },
            { title: "Действия",
              width: "140px",
              command: [
                { name: '_edit', text: "", className: "k-button-custom", iconClass: "glyphicon glyphicon-edit", click: _edit },
                { name: '_remove', text: "", className: "k-button-custom", iconClass: "glyphicon glyphicon-trash", click: _remove },
              ] 
            }
          ]
        };

        function _edit(e){
        	e.preventDefault();
        	e.stopPropagation();
        	debugger
        };

        function _remove(e){
        	e.preventDefault();
        	e.stopPropagation();
        	debugger
        };

  	};
  }]);