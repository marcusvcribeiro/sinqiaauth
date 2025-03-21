import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuloGruposUsuariosComponent } from './page/grupos_usuarios/modulo-grupos-usuarios.component';
import { ModuloAssociacaoAlcadaGrpUsuarioComponent } from './page/modulo-associacao-alcada-grp-usuario/modulo-associacao-alcada-grp-usuario.component';
import { ModuloAutorizacaoLiberacaoComponent } from './page/modulo-autorizacao-liberacao/modulo-autorizacao-liberacao.component';
import { ModuloComposicaoGrpUsuarioComponent } from './page/modulo-composicao-grp-usuario/modulo-composicao-grp-usuario.component';
import { ModuloNivelHierarquicoComponent } from './page/modulo-nivel-hierarquico/modulo-nivel-hierarquico.component'
import { ModuloParticipanteIndiretoComponent } from './page/modulo-participante-indireto/modulo-participante-indireto.component'
const routes: Routes = [
  {
    path: 'grupos-usuarios',
    component: ModuloGruposUsuariosComponent
  },
  {
    path: 'nivel-hierarquico',
    component: ModuloNivelHierarquicoComponent
  },
  {
    path: 'composicao-grupo-usuarios',
    component: ModuloComposicaoGrpUsuarioComponent
  },
  {
    path: 'associacao-alcada-grupo-usuarios',
    component: ModuloAssociacaoAlcadaGrpUsuarioComponent
  },
  {
    path: 'autorizacao-liberacao',
    component: ModuloAutorizacaoLiberacaoComponent
  },
  {
    path: 'participante-indireto',
    component: ModuloParticipanteIndiretoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloCadastrosRoutingModule {

}
