import { NgIf, NgIfContext } from "@angular/common";
import {
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";

@Directive({
  selector: "[segFuncao], [segFuncoes]",
})
export class SegFuncaoDirective {
  private _context: NgIfContext<boolean> = new NgIfContext<boolean>();
  private _thenTemplateRef: TemplateRef<NgIfContext<boolean>> | null = null;
  private _elseTemplateRef: TemplateRef<NgIfContext<boolean>> | null = null;
  private _thenViewRef: EmbeddedViewRef<NgIfContext<boolean>> | null = null;
  private _elseViewRef: EmbeddedViewRef<NgIfContext<boolean>> | null = null;

  private global_permissions: string[];

  constructor(
    private _viewContainer: ViewContainerRef,
    templateRef: TemplateRef<NgIfContext<boolean>>
  ) {
    this._thenTemplateRef = templateRef;
    this.global_permissions = JSON.parse(localStorage.getItem("seg-funcao"));
  }

  ngAfterViewInit() {}

  @Input()
  set segFuncao(funcao: string) {
    this._context.$implicit = this._context.ngIf = this.verify(funcao);
    this._updateView();
  }

  @Input()
  set segFuncoes(funcoes: string[]) {
    let _verify = false;

    funcoes.forEach((e) => {
      if (this.verify(e)) {
        _verify = true;
        return;
      }
    });

    this._context.$implicit = this._context.ngIf = _verify;
    this._updateView();
  }

  private verify(funcao: string): boolean {
    var modulo = funcao.substring(0, 4);
    var permissao =
      this.global_permissions.filter((x) => x == funcao).length +
      this.global_permissions.filter((x) => x == `${modulo}ACESSO_TOTAL`)
        .length;
    return permissao >= 1;
  }

  private _updateView() {
    if (this._context.$implicit) {
      this._viewContainer.clear();
      this._elseViewRef = null;
      this._thenViewRef = this._viewContainer.createEmbeddedView(
        this._thenTemplateRef,
        this._context
      );
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        try {
          this._elseViewRef = this._viewContainer.createEmbeddedView(
            this._elseTemplateRef,
            this._context
          );
        } catch {
          this._viewContainer.remove();
        }
      }
    }
  }
}
