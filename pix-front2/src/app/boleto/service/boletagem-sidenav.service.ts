import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { SidenavItem } from 'src/app/shared/component/sidenav/sidenav.component';

class BoletoMetadata {

}

@Injectable()
export class BoletoSidenavService {
  form: FormGroup;
  metaData: BoletoMetadata;

  private labelMap: any;

  public readonly sidenavItems: Subject<SidenavItem[]> = new Subject();
  public readonly idSelecionado: Subject<string> = new Subject();

  montarSidenav(form: FormGroup) {
    this.form = form;
    this.atualizarSidenav();
  }

  montarMetadata(metaData: BoletoMetadata): void {
    this.labelMap = this.montarLabel(metaData);
  }

  atualizarSidenav(): void {
    const modelo = this.form.getRawValue();
    this.sidenavItems.next(this.montarArvoreSidenav(modelo));
  }

  atualizarIdSelecionado(id: string): void {
    this.idSelecionado.next(id);
  }

  private montarArvoreSidenav(modelo: any, idPai: string = ''): SidenavItem[] {
    const sideNavlist: SidenavItem[] = [];
    if (modelo && Array.isArray(modelo)) {
      for (let i = 0; i < modelo.length; i++) {
        const grupo = modelo[i];
        const list: SidenavItem = {
          id: `${idPai}${i}`,
          label: `${i}`,
          items: this.montarArvoreSidenav(grupo, `${idPai}${i}_`)
        };
        sideNavlist.push(list);
      }
    } else {
      // tslint:disable-next-line: forin
      for (const campo in modelo) {
        let list: SidenavItem;
        const valor = modelo[campo];
        if (typeof valor === 'string') {
          list = {
            id: `${idPai}${campo}`,
            label: this.labelMap[campo],
            items: []
          };
        } else {
          list = {
            id: `${idPai}${campo}`,
            label: this.labelMap[campo],
            items: this.montarArvoreSidenav(valor, `${idPai}${campo}_`)
          };
        }
        sideNavlist.push(list);
      }
    }

    return sideNavlist;
  }

  private montarLabel(metaData: any): object {
    let labelMap = {};
    if (metaData.labelCampo) {
      labelMap[metaData.id] = metaData.labelCampo;
    }
    if (metaData.label) {
      labelMap[metaData.id] = metaData.label;
    }
    if (metaData.tags) {
      metaData.tags.forEach(t => {
        labelMap = { ...(this.montarLabel(t)), ...labelMap };
      });
    }
    if (metaData.grupos) {
      metaData.grupos.forEach(g => {
        labelMap = { ...(this.montarLabel(g)), ...labelMap };
      });
    }
    return labelMap;
  }
}
