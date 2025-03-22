<%
function declareErrorFunction(data){

  const typesData =  [...new Set(data.map(x => x.type))]; 

    for (let type of typesData) {
        if (type === 'input') {
           %> getError(input){
                const inputValidation =  this[( input + 'Validation')] ;
                
                if(this.form.get(input).errors){
                  for (const [key, valor] of Object.entries(this.form.get(input).errors)) {
                    for (const validator of inputValidation){
                      if( validator.type == key ){
                        return validator.errorMsg;
                      }  
                    }
                  }
                }
                return null;
              }
            <%
        }
    }
} 
declareErrorFunction(formConstructor);
%>