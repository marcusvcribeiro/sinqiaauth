<%
function declareForm(data){
    %> form: FormGroup;
    <%  for (let obj of data) {
            if (obj.type === 'input') {
                if(obj.properties.validation){
                    %><%= obj.properties.endpointName %>Validation = <%= JSON.stringify(obj.properties.validation)  %>;<%
                }
                if(obj.properties.hint){
                    %><%= obj.properties.endpointName %>Hint = '<%= obj.properties.hint  %>';<%
                }
            }
        }
} 
declareForm(formConstructor);
%>