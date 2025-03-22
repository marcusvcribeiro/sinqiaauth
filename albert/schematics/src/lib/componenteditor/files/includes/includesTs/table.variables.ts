<%
function declareVariables(data){
    for (let obj of data) {
        if (obj.type === 'table') {
            if( obj.properties.data !== "" && obj.properties.data !== undefined && obj.properties.data !== null ){ %>
                dataTable<%= obj.properties.id %> = [];
                dataSource<%= obj.properties.id %> = [];
                first<%= obj.properties.id %> = 1;
                rows<%= obj.properties.id %> =  <%= obj.properties.rows %> ;
                totalRecords<%= obj.properties.id %> : boolean ;
                loading<%= obj.properties.id %> : boolean ;
                cols<%= obj.properties.id %> = [
                    <% for(let col of obj.properties.data){  %>
                    {field: '<%= col.propertyName %>' , header: '<%= col.propertyName %>' },
                <% } %>];<%     
            }
        }
    }
} 
declareVariables(variables);
%>
