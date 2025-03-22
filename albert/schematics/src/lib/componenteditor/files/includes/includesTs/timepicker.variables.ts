<%
function declareVariables(data){
    for (let obj of data) {
        if (obj.type === 'timepicker') {
            if( obj.properties.value !== "" && obj.properties.value !== undefined && obj.properties.value !== null ){
                %>time<%= obj.properties.id %> = "<%= obj.properties.value %>"; <%      
            }
        }
    }
} 
declareVariables(variables);
%>