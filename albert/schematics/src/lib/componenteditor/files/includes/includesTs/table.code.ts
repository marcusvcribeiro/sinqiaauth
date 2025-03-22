createTable(){
    <%
  function receiveList(url, id, serviceName){
    %>
    this.<%= serviceName %>.get(<%= url %>).subscribe(res => {
        this.dataSource<%= id %> = res.items;
        this.totalRecords<%= id %> = res.items.length;
    });  
    <%
  }    

  
  function createTableList(data){
    
    for (let obj of data) {
     let url = '';
     let path = '' ;
     let serviceName = camelize(obj.properties.endpointName);

      if (obj.type === 'table'){
        if(obj.properties.urlData){
           url = obj.properties.urlData;
        } else{
          url = "https://dev.sinqia.io/api-consorcio-core";
          path = obj.properties.endpointPath;
        }
          receiveList('"' + url + path + '"', obj.properties.id, serviceName  );
      }
    }
  } 
  
  createTableList(code);
  %>
}

 <% function createLazyLoad(data){
     for (let obj of data) {
      if (obj.type === 'table'){
      %>loadData<%= obj.properties.id %>(event: LazyLoadEvent) {
          this.loading<%= obj.properties.id %> = true;
          setTimeout(() => {
            if (this.dataSource<%= obj.properties.id %>) {
                this.dataTable<%= obj.properties.id %> = this.dataSource<%= obj.properties.id %>.slice(event.first, (event.first + event.rows));
                this.loading<%= obj.properties.id %> = false;
            }
          }, 1000);
        }<%
      }
    }
 }  createLazyLoad(code);
 %>
 
 