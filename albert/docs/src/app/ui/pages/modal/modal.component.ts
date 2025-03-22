import { Component, OnInit } from '@angular/core';
import { ModalService } from '@albert/ui';

@Component({
  selector: 'doc-modal',
  templateUrl: './modal.component.html'
})
export class ModalDocComponent {

  constructor(private modalService: ModalService) { }

  showModal() {
    this.modalService.create({
      component: ModalExampleComponent,
      title: 'Modal'
    });
  }

  showModalFooter() {
    this.modalService.create({
      component: ModalFooterExampleComponent,
      title: 'Modal Footer'
    });
  }
}

@Component({
  template: `
    <h1> Isto é uma Modal! </h1>
    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
  `
})
export class ModalExampleComponent { }

@Component({
  template: `
    <h1> Isto é uma Modal! </h1>
    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
    <footer alb-modal-footer><button alb-button>OK</button></footer>
  `
})
export class ModalFooterExampleComponent { }
