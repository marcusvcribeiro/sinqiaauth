<%
  function createTimePicker(data){
    
    for (let obj of data) {
        if (obj.type === 'timepicker'){
            if(obj.properties.changeValue === true){
            %> changeValueTimepicker<%= obj.properties.id %>(e){
                console.log(e);
           }
          <%
          }  
        }
    }
  } 
  
  createTimePicker(code);
  %>
 