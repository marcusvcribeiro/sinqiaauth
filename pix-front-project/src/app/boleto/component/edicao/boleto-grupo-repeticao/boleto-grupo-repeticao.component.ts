import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { BoletoGrupo } from 'src/app/shared/model/boleto';
import { SidenavItem } from 'src/app/shared/component/sidenav/sidenav.component';

@Component({
  selector: 'app-boleto-repeticao-grupo',
  templateUrl: './boleto-grupo-repeticao.component.html',
  styleUrls: ['./boleto-grupo-repeticao.component.scss']
})
export class BoletoGrupoRepeticaoComponent implements OnInit {
  @Input() grupo: BoletoGrupo;
  @Input() formParent: FormArray;
  @Input() parentSidenavItems: SidenavItem[];

  grupoSidenavItem: SidenavItem;
  open = false;
  openGroups = {};

  constructor(private formBuilder: FormBuilder) {
  }

  // override
  ngOnInit(): void {
    this.criarSidenav();
  }

  adicionarNovoGrupo(event: any) {
    event.stopPropagation();
    const idGrupoAux = this.grupo.id;
    const formGroup = this.formBuilder.group({});
    formGroup.addControl(idGrupoAux, this.formBuilder.group({}));
    this.formParent.push(formGroup);
    this.adicionarSidenavGrupoItem();
  }

  removerGrupo(event: any, index: number) {
    event.stopPropagation();
    this.formParent.removeAt(index);
    this.removerSidenavGrupoItem(index);
  }

  toggleGroup() {
    if (this.formParent.controls.length === 0) {
      this.open = false;
    } else {
      this.open = !this.open;
    }
  }

  toggleChildren(element) {
    if (this.openGroups[element]) {
      this.openGroups[element] = false;
    } else {
      this.openGroups[element] = true;
    }
  }

  private criarSidenav() {
    const sidenavItemGrupo = this.criarSidenavItemFromGrupo();
    if (sidenavItemGrupo) {
      this.grupoSidenavItem = sidenavItemGrupo;
      this.parentSidenavItems.push(this.grupoSidenavItem);
    }
  }

  private criarSidenavItemFromGrupo(): SidenavItem {
    if (this.grupo.id) {
      if (!this.grupo.hash) {
        this.grupo.hash = uuidv4();
      }
      return { id: this.grupo.id, label: this.grupo.label, items: [], type: 'weak' };
    }
    return null;
  }

  private adicionarSidenavGrupoItem() {
    this.grupoSidenavItem.items.push({
      id: uuidv4(),
      label: `Item : ${this.grupoSidenavItem.items.length + 1}`,
      items: [],
      type: 'weak'
    });
  }

  private removerSidenavGrupoItem(index: number) {
    this.grupoSidenavItem.items.splice(index, 1);
    this.grupoSidenavItem.items.map((v, i) => {
      v.label = `${i + 1}`;
      return v;
    });
  }
}
