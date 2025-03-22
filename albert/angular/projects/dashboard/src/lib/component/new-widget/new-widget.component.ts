import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Widget } from '../../model/widget';

/**
 * @description
 * Componente de New-Widget.
 * É uma página que exibe os Widgets disponíveis para serem criados, e que permite a seleção de um para ser criado no Dashboard atual.
 */
@Component({
  selector: 'alb-new-widget',
  templateUrl: './new-widget.component.html'
})
export class NewWidgetComponent implements OnInit {

  /**
   * @description
   * Lista de Widgets que serão exibidos.
   */
  @Input() widgets: Widget[];

  /**
   * @description
   * Widget selecionado para ser criado no Dashboad atual.
   */
  @Output() widgetSelected: EventEmitter<Widget> = new EventEmitter();

  /**
   * @description
   * Widgets agrupados por Categoria.
   */
  WidgetCategoryMap: any = [];

  constructor() { }

  // override
  ngOnInit() {
    this.createWidgetCategoryMap();
  }

  /**
   * @description
   * Método que agrupa a lista de widgets por categoria.
   */
  private createWidgetCategoryMap() {
    this.widgets.forEach(widget => {
      if (widget.category) {
        let foundCategoria = false;
        for (const categoriaWidgetsMemory of this.WidgetCategoryMap) {
          if (categoriaWidgetsMemory.category.id === widget.category.id) {
            categoriaWidgetsMemory.widgets.push(widget);
            foundCategoria = true;
            break;
          }
        }
        if (!foundCategoria) {
          const categoriaWidgets = { category: widget.category, widgets: [] };
          categoriaWidgets.widgets.push(widget);
          this.WidgetCategoryMap.push(categoriaWidgets);
        }
      }
    });
  }

  /**
   * @description
   * Método que emite Widget selecionado.
   */
  createWidget(widget: Widget) {
    const widgetCopy = JSON.parse(JSON.stringify(widget));
    this.widgetSelected.emit(widgetCopy);
  }

}
