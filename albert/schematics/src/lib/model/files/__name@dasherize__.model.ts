export class <%= classify(name) %>Model {<%
  for (let field of fields) {
    %><%=  Object.keys(field)[0] %>: <%=  Object.values(field)[0] %>;<%
  }
%>}
