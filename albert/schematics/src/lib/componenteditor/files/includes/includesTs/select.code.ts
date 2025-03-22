createSelect(){
    <%
  function receiveList(url, id){
    %>
    this.selectService.get(<%= url %>).subscribe(res => {this.list<%= id %> = res});<%
  }    
  function createSelectList(data){
    
    for (let obj of data) {
      if (obj.type === 'select'){
        if(obj.properties.jsonList && obj.properties.typeList ==='json'){
          %> //Exemplo de inserção dos valores na lista. 
           this.list<%= obj.properties.id %> = <%= obj.properties.jsonList %> ; 
          <%
        }
        else if(obj.properties.urlList && obj.properties.typeList ==='url'){
          receiveList('"' + obj.properties.urlList + '"', obj.properties.id  );
        }
        else{
           %> //Exemplo de inserção dos valores na lista. 
           this.list<%= obj.properties.id %> = [{value: 1, label: "item-1"},{value: 2, label: "item-2"}] ; 
          <%
          }  
        }
    }
  } 
  
  createSelectList(code);
  %>
}