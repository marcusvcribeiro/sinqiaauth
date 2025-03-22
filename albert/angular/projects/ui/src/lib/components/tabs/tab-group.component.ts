import {
  SimpleChanges,
  OnChanges,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostBinding,
  HostListener,
} from '@angular/core';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TabComponent } from './tab.component';

/**
 * @description
 * Componente tab group
 * serve para agrupar as tabs
 */
@Component({
  selector: 'alb-tab-group',
  templateUrl: './tab-group.component.html',
})
export class TabGroupComponent implements OnInit, AfterViewInit {
  /**
   * @description
   * Evento para emitir tab selecionada
   */
  @Output() selectedTabChange = new EventEmitter<any>();

  /**
   * @description
   * Lista de tab component
   */
  tabItems: TabComponent[] = [];

  /**
   * @description
   * Tab selecionada
   */
  selectedTab: TabComponent;

  /**
   * @description
   * tamanho da tab
   */
  @Input() size: string;

  /**
   * @description
   * header
   */
  @ViewChild('tabHeader') tabHeader: ElementRef;

  ngOnInit(): void { }

  ngAfterViewInit() {
    const slider = this.tabHeader.nativeElement;
    this.showScrollButton();
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('wheel', (e) => {
      const walk = slider.scrollWidth / (slider.children.length - 2);
      if (e.deltaY < 0) {
        slider.scrollLeft -= walk;
      } else if (e.deltaY > 0) {
        slider.scrollLeft += walk;
      }
      this.showScrollButton();
    });
  }

  @HostListener('mousemove') onMove() {
    this.showScrollButton();
  }


  showScrollButton() {
    if (this.tabHeader.nativeElement.scrollLeft > 0) {
      this.tabHeader.nativeElement.firstChild.classList.add('active');
    } else {
      this.tabHeader.nativeElement.firstChild.classList.remove('active');
    }
    if (this.tabHeader.nativeElement.scrollWidth -
      this.tabHeader.nativeElement.scrollLeft >
      this.tabHeader.nativeElement.clientWidth + 1) {
      this.tabHeader.nativeElement.lastChild.classList.add('active');
    } else {
      this.tabHeader.nativeElement.lastChild.classList.remove('active');
    }
  }

  onScroll(direction: string) {
    const slider = this.tabHeader.nativeElement;

    if (direction === 'up') {
      for (let i = 0; i < slider.clientWidth; i++) {
        setTimeout(() => {
          slider.scrollLeft = slider.scrollLeft - 1;
        }, 100);
      }
    } else if (direction === 'down') {
      for (let i = 0; i < slider.clientWidth; i++) {
        setTimeout(() => {
          slider.scrollLeft += 1;
        }, 100);
      }
    }
    this.showScrollButton();
  }

  /**
   * @description
   * Adiciona tab no final da lista de tabs
   */
  addTab(tab: TabComponent) {
    this.tabItems.push(tab);
    if (this.tabItems.length === 1) {
      tab.selected = true;
    }
    if (tab.selected) {
      this.selectTab(this.tabItems.length - 1);
    }
  }

  /**
   * @description
   * remove a tab
   */
  removeTab(tab: TabComponent) {
    // removendo tab com base no indice dela no array de tabs
    const indiceTabAtual = this.tabItems.indexOf(tab);
    this.tabItems.splice(indiceTabAtual, 1);
    this.selectedTab = undefined;
    if (this.tabItems.length > 0) {
      let count = 1;
      let indexLeftTab = indiceTabAtual - count;
      // interrando para selecionar a primeira tab a esquerda da tab removida que nao esteja disabled
      while (indexLeftTab >= 0) {
        const leftTab = this.tabItems[indexLeftTab];
        if (!!leftTab && !leftTab.disabled) {
          this.selectTab(indexLeftTab);
          break;
        }
        indexLeftTab = indiceTabAtual - count++;
      }
    }
  }

  /**
   * @description
   * selecionando tab com base no indice
   */
  selectTab(index: number) {
    this.selectedTab = this.tabItems[index];
    this.tabItems.forEach((v) => (v.selected = false));
    this.selectedTab.selected = true;
    this.selectedTabChange.emit(this.selectedTab.id);
  }
}
