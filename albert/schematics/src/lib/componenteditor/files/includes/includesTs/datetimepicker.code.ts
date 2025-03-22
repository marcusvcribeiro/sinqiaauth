<%
  function createDatetimePicker(data){
    
    for (let obj of data) {
        if (obj.type === 'datetimepicker'){
            if(obj.properties.changeValue === true){
            %> changeValueDatetimepicker<%= obj.properties.id %>(e){
                console.log(e);
           }
          <%
          }  
        }
    }
  } 
  
  createDatetimePicker(code);
  %>
 