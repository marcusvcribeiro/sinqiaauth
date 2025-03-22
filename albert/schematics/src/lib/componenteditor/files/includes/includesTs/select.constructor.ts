<%
function declareService(){
    let constructorService = constructor.find(hasService);
    if(constructorService){
        %> private selectService : SelectService,
    <%  
    }
  
} 
declareService(constructor);

function hasService(obj){
    if(obj.type === 'select' && (obj.properties.typeList === 'url')) 
    return obj;
}
%>

