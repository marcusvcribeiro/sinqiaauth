this.form = this.fb.group({
      <%
      function createFormGroup(data) {
        for (let obj of data) {
          if (obj.type === 'input') {
            %><%= obj.properties.endpointName %>: new FormControl( '',[<%
              if(obj.properties.validation){
                for (let validation of obj.properties.validation) {
                %> Validators.<%= validation.control %><%
                  if (validation.limitValue) {
                %>(<%= validation.limitValue %>),<%
                  } else {
                  %>, <%
                  }
                }
              }
              
            %>]),<%
          }
        }
      }
      createFormGroup(formConstructor);     
      %>
});
