import { AfterViewInit, Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { SidenavItem } from 'src/app/shared/component/sidenav/sidenav.component';
import { BoletoGrupo, BoletoTag } from 'src/app/shared/model/boleto';
import { BoletoTipoCampo } from 'src/app/shared/model/enum/boleto-tipo-campo';
import { KeyValue } from 'src/app/shared/model/key-value';
import { v4 as uuidv4 } from 'uuid';
import { BoletoCampoComponent } from '../boleto-campo/boleto-campo.component';

@Component({
  selector: 'app-boleto-grupo',
  templateUrl: './boleto-grupo.component.html',
  styleUrls: ['./boleto-grupo.component.scss'],
})
export class BoletoGrupoComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChildren(BoletoCampoComponent) campos: QueryList<BoletoCampoComponent>;
  @ViewChildren(BoletoGrupoComponent) grupos: QueryList<BoletoGrupoComponent>;

  @Input() grupo: BoletoGrupo;
  @Input() formParent: FormGroup;
  @Input() labelParent = [];
  @Input() parentSidenavItems: SidenavItem[];
  @Input() hideHeader: boolean;
  @Input() validatable: boolean;
  @Input() primeiroGrupo: boolean;

  validatableOriginalValue: boolean;
  grupoSidenavItem: SidenavItem;

  openGroup = true;

  private tagsPreenchidas$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private gruposPreenchidos$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get tagsPreenchidas(): Observable<boolean> {
    return this.tagsPreenchidas$.asObservable();
  }

  get gruposPreenchidos(): Observable<boolean> {
    return this.gruposPreenchidos$.asObservable();
  }
  constructor(private formBuilder: FormBuilder) {
  }
  orderTgas = [];
  arrayTags: KeyValue[] = [];
  idPosicao = 0;
  // override
  ngOnInit(): void {
    this.criarLabelParent();
    this.criarForm();

    if (this.grupo.campoObrigatorio === true || this.grupo.campoObrigatorio === false) {
      this.validatable = this.validatable && this.grupo.campoObrigatorio;
      this.validatableOriginalValue = this.validatable;
    }
  }

  // override
  ngAfterViewInit(): void {
    if (this.primeiroGrupo) {
      return;
    }
    combineLatest(...this.campos.toArray().map(v => v.filled)).subscribe(v => {
      const hasAnyTagFilled = !!v.find(v => v === true);
      this.tagsPreenchidas$.next(hasAnyTagFilled);
      this.validatable = hasAnyTagFilled ? hasAnyTagFilled : this.validatableOriginalValue;
      this.updateTagsAndGruposFormValidation();
    });

    combineLatest(...this.grupos.toArray().map(v => v.tagsPreenchidas)).subscribe(v => {
      const hasAnyTagFilled = !!v.find(v => v === true);
      this.gruposPreenchidos$.next(hasAnyTagFilled);
      this.validatable = hasAnyTagFilled ? hasAnyTagFilled : this.validatableOriginalValue;
      this.updateTagsAndGruposFormValidation();
    });

    combineLatest(...this.grupos.toArray().map(v => v.gruposPreenchidos)).subscribe(v => {
      const hasAnyTagFilled = !!v.find(v => v === true);
      this.gruposPreenchidos$.next(hasAnyTagFilled);
      this.validatable = hasAnyTagFilled ? hasAnyTagFilled : this.validatableOriginalValue;
      this.updateTagsAndGruposFormValidation();
    });
  }

  // override
  ngOnChanges(changes: SimpleChanges): void {
    const { validatable } = changes;
    if (validatable && (validatable.currentValue || !validatable.currentValue)) {
      this.updateTagsAndGruposFormValidation();
    }
  }

  criarForm() {
    this.orderTgas = [];
    let total = this.grupo.tags.length + this.grupo.grupos.length; 
    let t = 0, g = 0;
    for (let i = 0; i < total; i++) {
        if(this.grupo.tags[t] && this.grupo.grupos[g]){
          if(this.grupo.tags[t].ordemCampo < this.grupo.grupos[g].ordem){
            this.criarTag(this.grupo.tags[t]);
            this.orderTgas.push(this.grupo.tags[t].ordemCampo);
            t++;
          }else{
            if(this.formGrupos && this.formGrupos.contains(this.grupo.grupos[g].id)){
              this.grupo.grupos[g].id = this.grupo.grupos[g].id+'_duplic'+this.grupo.grupos[g].ordem;
              this.grupo.grupos[g].tags.forEach(tag => {
                tag.tagPai = this.grupo.grupos[g].id;
              });
            }else{
              if(this.grupo.grupos[g].id.includes('_duplic')){
                this.grupo.grupos[g].id = this.grupo.grupos[g].id.substr(0, this.grupo.grupos[g].id.indexOf('_duplic'));
                this.grupo.grupos[g].id = this.grupo.grupos[g].id+'_duplic'+this.grupo.grupos[g].ordem;
                this.grupo.grupos[g].tags.forEach(tag => {
                  tag.tagPai = this.grupo.grupos[g].id;
                });
  
              }else{
                this.grupo.grupos[g].id = this.grupo.grupos[g].id+'_duplic'+this.grupo.grupos[g].ordem;
                this.grupo.grupos[g].tags.forEach(tag => {
                  tag.tagPai = this.grupo.grupos[g].id;
                });
              }
            }
            this.criarGrupo(this.grupo.grupos[g]);
            this.orderTgas.push(this.grupo.grupos[g].ordem);
            g++;
          }          
        }else if (this.grupo.tags[t]){
          this.criarTag(this.grupo.tags[t]);
          this.orderTgas.push(this.grupo.tags[t].ordemCampo);
          t++;
        }else{
          if(this.formGrupos && this.formGrupos.contains(this.grupo.grupos[g].id)){
            this.grupo.grupos[g].id = this.grupo.grupos[g].id+'_duplic'+this.grupo.grupos[g].ordem;
            this.grupo.grupos[g].tags.forEach(tag => {
              tag.tagPai = this.grupo.grupos[g].id;
            });
          }else{
            if(this.grupo.grupos[g].id.includes('_duplic')){
              this.grupo.grupos[g].id = this.grupo.grupos[g].id.substr(0, this.grupo.grupos[g].id.indexOf('_duplic'));
              this.grupo.grupos[g].id = this.grupo.grupos[g].id+'_duplic'+this.grupo.grupos[g].ordem;
              this.grupo.grupos[g].tags.forEach(tag => {
                tag.tagPai = this.grupo.grupos[g].id;
              });

            }else{
              this.grupo.grupos[g].id = this.grupo.grupos[g].id+'_duplic'+this.grupo.grupos[g].ordem;
              this.grupo.grupos[g].tags.forEach(tag => {
                tag.tagPai = this.grupo.grupos[g].id;
              });
            }
            
          }
          this.criarGrupo(this.grupo.grupos[g]);
          this.orderTgas.push(this.grupo.grupos[g].ordem);
          g++;
        }
    }

    this.criarSidenav();
  }

  criarTag(tag: BoletoTag) {
    this.formParent.addControl('tags', this.formBuilder.group({}));
    this.formTags.addControl(tag.id, this.formBuilder.control(
      this.setValorTag(tag), [
      this.required(tag),
      this.whitespaceValidator(tag),
      this.tagMinLengthValidator(tag),
      this.tagMaxLengthValidator(tag)
    ]
    ));
   
  }

  criarGrupo(grupo: BoletoGrupo) {
    this.formParent.addControl('grupos', this.formBuilder.group({}));
    if (grupo.tagRepetindo) {
      this.formGrupos.addControl(grupo.id, this.formBuilder.array([], [grupo.campoObrigatorio? Validators.required: null]));
    } else {
      this.formGrupos.addControl(grupo.id, this.formBuilder.group({}));
    }    
  }
  get formTags(): FormGroup {
    return this.formParent.get('tags') as FormGroup;
  }

  get formGrupos(): FormGroup {
    return this.formParent.get('grupos') as FormGroup;
  }

  translateQuantidadeChars(value) {
    return { quantidadeChars: value };
  }

  toggle() {
    this.openGroup = !this.openGroup;
  }

  private isDateType(tipoCampo: BoletoTipoCampo) {
    return tipoCampo === BoletoTipoCampo.DATE || tipoCampo === BoletoTipoCampo.DATETIME || tipoCampo === BoletoTipoCampo.TIME;
  }

  private tagMinLengthValidator(tag: BoletoTag) {
    return tag.qtdMinimaCaracter && !this.isDateType(tag.tipoCampo) ?
      Validators.nullValidator : Validators.minLength(tag.qtdMinimaCaracter);
  }

  private tagMaxLengthValidator(tag: BoletoTag) {
    return tag.qtdMaximaCaracter && this.isDateType(tag.tipoCampo) ?
      Validators.nullValidator : Validators.maxLength(tag.qtdMaximaCaracter);
  }

  private setValorTag(tag: BoletoTag): any {
    if (!tag.valorTag) {
      return null;
    }
    if (tag.tipoCampo === BoletoTipoCampo.INTEGER || tag.tipoCampo === BoletoTipoCampo.NUMERIC || tag.tipoCampo === BoletoTipoCampo.REAL) {
      return Number(tag.valorTag);
    }
    return tag.valorTag;
  }

  private criarLabelParent() {
    if (!this.labelParent) {
      this.labelParent = [];
    }
    if (this.grupo.label) {
      const label = `${this.grupo.label}${this.grupo.campoObrigatorio ? '' : ' (Opcional)'}`;
      this.labelParent.push(label);
    }
  }

  private criarSidenavItemFromGrupo(): SidenavItem {
    if ((!this.grupo.tags || this.grupo.tags.length === 0) && this.grupo.grupos.length === 1) {
      return null;
    } else if (this.grupo.id) {
      if (!this.grupo.hash) {
        this.grupo.hash = uuidv4();
      }
      return { id: this.grupo.hash, label: this.labelParent.join(' > '), items: [], type: 'weak' };
    }
    return null;
  }

  private criarSidenav() {
    const sidenavItemGrupo = this.criarSidenavItemFromGrupo();
    if (sidenavItemGrupo) {
      this.grupoSidenavItem = sidenavItemGrupo;
      this.parentSidenavItems.push(this.grupoSidenavItem);
    }
  }

  private updateTagsAndGruposFormValidation() {
    if (this.formTags) {
      this.grupo.tags.forEach(tag => {
        this.formTags.get(tag.id).updateValueAndValidity();
      });
    }
    if (this.formGrupos) {
      this.grupo.grupos.forEach(grupo => {
        this.formGrupos.get(grupo.id).updateValueAndValidity();
      });
    }
  }

  private required(tag: BoletoTag): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let required = false;

      if (this.validatable && tag.campoObrigatorio) {
        if (control.value) {
          required = false;
        } else {
          required = true;
        }
      }
      return required ? { 'required': { value: control.value } } : null;
    };
  }

  private whitespaceValidator(tag: BoletoTag): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let isValid = true;

      if (this.validatable && tag.campoObrigatorio && control.value && typeof control.value === 'string') {
        const isWhitespace = control.value.trim().length === 0;
        isValid = !isWhitespace;
      }

      return isValid ? null : { 'whitespace': true };
    };
  }

  salvarOrderTag(posicaoI: number ,ordemTag :string){
    this.arrayTags.push(
      { id: 0,
         descricao: ordemTag
      });
      this.idPosicao = posicaoI;
  }

  proximoTag(posicaoI : number, ordemTag : Number){
     if(this.idPosicao === 0){
       this.idPosicao = posicaoI + 1;
       if(this.orderTgas[this.idPosicao] === ordemTag){
        this.arrayTags.push(
          { id: this.idPosicao,
             descricao: ordemTag.toString()
          });
        return true;  
       }
     }else{
      this.idPosicao++
      if(this.orderTgas[this.idPosicao] === ordemTag){
        this.arrayTags.push(
          { id: this.idPosicao,
             descricao: ordemTag.toString()
          });
        return true;  
       }
     }
     return false;
  }

  verificaExistencia(num : Number){
    const tagsOk = this.arrayTags.find(x => x.descricao === num.toString());
    if (tagsOk)
      return true;
    else
      return false;
  }
  
}
