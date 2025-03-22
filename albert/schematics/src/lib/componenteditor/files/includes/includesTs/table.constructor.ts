<%
function declareService(){
    for(let obj of imports){
        if(obj.type === 'table') {
        %> private <%= camelize(obj.properties.endpointName) %> : <%= classify(dasherize(obj.properties.endpointName)) %>Service,
              <% 
          }
        }
} 
declareService(constructor);

%>
