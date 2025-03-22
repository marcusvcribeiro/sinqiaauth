<% function createImports(data) { 
    const typesData =  [...new Set(data.map(x => x.type))];

    for (let obj of typesData) { 
        if(obj === 'table'){%> import { LazyLoadEvent } from 'primeng/api'; <%}
    }
    
    for(let obj of data){
        if(obj.type === 'table') {
            %> import { <%=classify(dasherize(obj.properties.endpointName)) %>Service } 
            from './services/<%= dasherize(obj.properties.endpointName) %>.service';
            <% 
        }
    }
}
createImports(imports);
%>
