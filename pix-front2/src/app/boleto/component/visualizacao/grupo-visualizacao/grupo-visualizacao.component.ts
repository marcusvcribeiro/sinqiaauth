import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BoletoGrupo, DominioTag } from '../../../../shared/model/boleto';
import { BoletoTipoCampo } from '../../../../shared/model/enum/boleto-tipo-campo';

@Component({
  selector: 'app-grupo-visualizacao',
  templateUrl: './grupo-visualizacao.component.html',
  styleUrls: ['./grupo-visualizacao.component.scss']
})
export class GrupoVisualizacaoComponent implements OnChanges, OnInit {
  @Input() boleto: BoletoGrupo;
  @Input() idSelecionado: string;
  @Input() firstGroup = true;
  @Input() label;
  @Input() stopAppendParent = false;
  labelGrupo;
  stopAppend = false;

  isExpandido = true;

  boletoTipoCampo = BoletoTipoCampo;

  ngOnInit() {
    this.concatLabel();
    this.stopConcatWhen();
  }

  ngOnChanges(change: SimpleChanges) {
    const { idSelecionado } = change;

    if (idSelecionado && idSelecionado.currentValue !== idSelecionado.previousValue && idSelecionado.currentValue) {
      this.navigate(idSelecionado.currentValue);
    }
  }

  onToggle() {
    this.isExpandido = !this.isExpandido;
  }

  navigate(idSelecionado) {
    document.getElementById(idSelecionado).scrollIntoView({
      behavior: 'smooth'
    });
  }

  concatLabel() {
    if (this.boleto) {
      if (this.boleto && !(this.boleto.tags && this.boleto.tags.length) && this.boleto.grupos.length <= 1) {
        this.label = this.label ? this.label + ' > ' + this.boleto.label : this.boleto.label;
      }
      if (this.boleto.grupos && this.boleto.grupos.length > 1) {
        this.stopAppend = true;
      }
    }
  }

  stopConcatWhen() {
    if (this.boleto) {
      if (this.label && !this.stopAppend && !this.stopAppendParent) {
        this.labelGrupo = this.label + ' > ' + this.boleto.label;
      } else if ((this.label && this.stopAppend)) {
        this.labelGrupo = this.label;
      } else {
        this.labelGrupo = this.boleto.label;
      }
    }
  }

  exibirValorTag(list: DominioTag[], tag: String  ){   
    const valorTag = list.find(x => x.id === tag);
    if (valorTag)
      return valorTag.id + ' - ' + valorTag.descricao
    else
      return tag;
  }
}
