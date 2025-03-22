<%
function declareService(){
    let constructorService = constructor.find(hasService);
    if(constructorService){
        %> private dialogService: DialogService,
    <%  
    }
  
} 
declareService(constructor);

function hasService(obj){
    if(obj.type === 'button'){
        if(obj.properties.dialog !== null && obj.properties.dialog !=='' && obj.properties.dialog !== undefined && obj.properties.dialog !== false) 
        return obj;
    } 
}
%>