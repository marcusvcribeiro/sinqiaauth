import { Component } from '@angular/core';

@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html'
})
export class <%= classify(name) %>Component {
    
}