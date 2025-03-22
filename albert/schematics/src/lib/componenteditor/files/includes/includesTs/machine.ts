<% function createTemplate(options) { 
    %><%= include( 'includesTs/form.variables.ts', options.data ) %><%
    if(variables.length == 1){
        %><%= include( 'includesTs/' + variables[0].type +'.variables.ts') %><%
    } 
    else {
        const typesVariables =  [...new Set(variables.map(x => x.type))];
        for (let obj of typesVariables) { 
          %><%= include( 'includesTs/' + obj +'.variables.ts') %><%
        }
    }  %> 

    constructor( <%
        if(constructor.length == 1){
            %><%= include( 'includesTs/' + constructor[0].type +'.constructor.ts') %><% 
        } 
        else {
            const typesConstructor =  [...new Set(constructor.map(x => x.type))]; 
        for (let obj of typesConstructor) {
                    %><%= include( 'includesTs/' + obj +'.constructor.ts') %><% 
            }
        }
        %> <%= include( 'includesTs/form.constructor.ts') %>
    ){
        <%= include( 'includesTs/form.code.ts') %>
    }

    ngOnInit(): void {
            <%= include( 'includesTs/initializeFunctions.ts') %>
    } <%
    
    if(code.length == 1){
        %><%= include( 'includesTs/' + code[0].type +'.code.ts') %> <% 
    } 
    else {
        const typesCode =  [...new Set(code.map(x => x.type))]; 
        for (let obj of typesCode) {
            %><%= include( 'includesTs/' + obj +'.code.ts') %> <% 
        }
    }
}

createTemplate(data);
%>
