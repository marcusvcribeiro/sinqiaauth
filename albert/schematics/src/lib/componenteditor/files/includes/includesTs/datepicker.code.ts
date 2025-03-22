<%
  function createDatePicker(data){
    
    for (let obj of data) {
        if (obj.type === 'datepicker'){
            if(obj.properties.changeValue === true){
            %> changeValueDatepicker<%= obj.properties.id %>(e){
                console.log(e);
           }
          <%
          }  
        }
    }
  } 
  
  createDatePicker(code);
  %>
 