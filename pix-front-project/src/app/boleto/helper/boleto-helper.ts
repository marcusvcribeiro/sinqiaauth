import { v4 as uuidv4 } from 'uuid';
import { SidenavItem } from '../../shared/component/sidenav/sidenav.component';
import { BoletoGrupo, BoletoTag } from '../../shared/model/boleto';

export class BoletoHelper {

  static criarVisualizacao(estrutura: BoletoGrupo, dados: BoletoGrupo): BoletoGrupo {
    this.setGruposVisualizacao([estrutura], [dados]);
    return dados;
  }

  static criarEditar(estrutura: BoletoGrupo, dados: BoletoGrupo): BoletoGrupo {
    this.setGruposEdicao([estrutura], [dados]);
    return estrutura;
  }

  static hasRepeticao(estrutura: BoletoGrupo | BoletoGrupo[]): any {
    let hasRepeticao = false;
    const grupos = Array.isArray(estrutura) ? estrutura : estrutura.grupos;
    for (let i = 0; i < grupos.length; i++) {
      const grupo = grupos[i];
      if (grupo.tagRepetindo) {
        hasRepeticao = true;
        break;
      }
      if (grupo.grupos && grupo.grupos.length > 0) {
        hasRepeticao = this.hasRepeticao(grupo.grupos);
      }
    }
    return hasRepeticao;
  }

  static criarSideNav(boleto: BoletoGrupo, isEmptyGroup?: boolean): SidenavItem[] {
    const sidenavs: SidenavItem[] = [];
    if (isEmptyGroup) {
      return;
    }

    boleto.grupos.forEach((grupo) => {
      let items = [];
      if (Array.isArray(grupo.grupos) && grupo.grupos.length) {
        if (Array.isArray(grupo.tags) && !grupo.tags.length && grupo.grupos.length <= 1) {
          items = this.criarSideNav(grupo, true);
        } else {
          items = this.criarSideNav(grupo);
        }
      }

      sidenavs.push({
        id: grupo.id,
        label: grupo.label ? grupo.label : '-',
        type: 'weak',
        hash: grupo.hash,
        items: items
      });
    });

    return sidenavs;
  }

  private static setCamposVisualizacao(estruturaCampo: BoletoTag[], dadosCampo: BoletoTag[]) {
    estruturaCampo.forEach(estrutura => {
      for (const dado of dadosCampo) {
        if (estrutura.id === dado.id) {
          dado.hash = uuidv4();
          dado.tagPai = estrutura.tagPai;
          dado.campoObrigatorio = estrutura.campoObrigatorio;
          dado.ordemCampo = estrutura.ordemCampo;
          dado.labelCampo = estrutura.labelCampo;
          dado.tipoCampo = estrutura.tipoCampo;
          dado.classificacaoCampo = estrutura.classificacaoCampo;
          dado.qtdMinimaCaracter = estrutura.qtdMinimaCaracter;
          dado.qtdMaximaCaracter = estrutura.qtdMaximaCaracter;
          dado.qtdCasasDecimais = estrutura.qtdCasasDecimais;
          dado.tipoTag = estrutura.tipoTag;
          dado.dominioTags = estrutura.dominioTags;
          dado.atributoTags = estrutura.atributoTags;
          break;
        }
      }
    });
  }

  private static setGruposVisualizacao(estruturas: BoletoGrupo[], dados: BoletoGrupo[]) {
    estruturas.forEach((estrutura: BoletoGrupo) => {
      for (const dado of dados) {
        if (dado.id === estrutura.id) {
          dado.hash = uuidv4();
          dado.tagRepetindo = estrutura.tagRepetindo;
          dado.label = estrutura.label;
          dado.ordem = estrutura.ordem;
          dado.campoObrigatorio = estrutura.campoObrigatorio;

          this.setCamposVisualizacao(estrutura.tags, dado.tags);

          if (Array.isArray(estrutura.grupos) && estrutura.grupos.length) {
            this.setGruposVisualizacao(estrutura.grupos, dado.grupos);
          }
        }
      }
    });
  }

  private static setCamposEdicao(estruturaCampo: BoletoTag[], dadosCampo: BoletoTag[]) {
    //estrutura = nova
    //dados = antiga
    estruturaCampo.forEach(estrutura => {
      estrutura.hash = uuidv4();
      for (const dado of dadosCampo) {
        if (estrutura.id === dado.id && estrutura.id !== "EndToEndId" && estrutura.id !== "MsgId") {
          estrutura.valorTag = dado.valorTag;
          break;
        }
      }
    });
  }

  private static setGruposEdicao(estruturas: BoletoGrupo[], dados: BoletoGrupo[]) {
    estruturas.forEach((estrutura: BoletoGrupo) => {
      estrutura.hash = uuidv4();
      for (const dado of dados) {
        if (dado.id === estrutura.id) {
          this.setCamposEdicao(estrutura.tags, dado.tags);
          if (Array.isArray(estrutura.grupos) && estrutura.grupos.length) {
            this.setGruposEdicao(estrutura.grupos, dado.grupos);
          }
          break;
        }
      }
    });
  }
}
