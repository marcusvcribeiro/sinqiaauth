<%
function declareVariables(data){
    for (let obj of data) {
        if (obj.type === 'select') {
          %> list<%= obj.properties.id %> = [];<%      
        }
    }
} 
declareVariables(variables);
%>