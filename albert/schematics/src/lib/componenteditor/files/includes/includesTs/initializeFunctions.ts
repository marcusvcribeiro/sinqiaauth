
<%
function initializeOnInitFunctions(data){
    const typesData =  [...new Set(code.map(x => x.type))]; 

    typesData.map(obj => { 
        if(obj !== 'button' && 
        obj !== 'datepicker' && 
        obj !== 'timepicker' &&
        obj !== 'input' &&
        obj !== 'datetimepicker'){
        %> this.create<%= classify(obj) %>();             
    <% }

    })
}
initializeOnInitFunctions(code);
%>
