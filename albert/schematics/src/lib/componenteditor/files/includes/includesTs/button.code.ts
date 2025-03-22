<%
function createDialog(data){
    
    for (let obj of data) {
        if (obj.type === 'button'){
            if(obj.properties.dialog !== null && obj.properties.dialog !== '' && obj.properties.dialog !== undefined && obj.properties.dialog !== false){ 
                 %>  showDialog<%= obj.properties.id %>(){
                this.dialogService.create({
                    type: '<%= obj.properties.dialogType %>',
                    title: '<%= obj.properties.dialogTitle %>',
                    message: '<%= obj.properties.dialogMessage %>',
                    btnPrimaryText: '<%= obj.properties.dialogBtnPrimaryText %>'
                    });
                }<%
            }  
        }
    }
} 
  
createDialog(code);
%>