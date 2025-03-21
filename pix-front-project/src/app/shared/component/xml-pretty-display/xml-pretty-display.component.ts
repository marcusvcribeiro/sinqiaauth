import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-xml-pretty-display',
  templateUrl: './xml-pretty-display.component.html',
  styleUrls: ['./xml-pretty-display.component.scss']
})
export class XmlPrettyDisplayComponent {
  @Input() set elemento(elemento: any) {
    this.xmlFormatted = elemento ? this.formatXml(elemento) : null;
  }

  xmlFormatted: string;
  // deixar o automaticLayout e verificar caso de problema de performace
  editorOptions = { theme: 'vs-dark', language: 'xml', readOnly: true, automaticLayout: true };

  constructor() {
  }

  formatXml(xml, tab?) {
    let formatted = '', indent = '';
    tab = tab || '\t';
    xml.split(/>\s*</).forEach(function (node) {
      if (node.match(/^\/\w/)) indent = indent.substring(tab.length);
      formatted += indent + '<' + node + '>\r\n';
      if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab;
    });
    return formatted.substring(1, formatted.length - 3);
  }
}
