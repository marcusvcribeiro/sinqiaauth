<%
function declareVariables(data){
    for (let obj of data) {
        if (obj.type === 'datepicker') {
            if( obj.properties.value !== "" && obj.properties.value !== undefined && obj.properties.value !== null ){
                %>date<%= obj.properties.id %> = new Date("<%= obj.properties.value %>"); <%      
            }
        }
    }
} 
declareVariables(variables);
%>