import {
  Component, EventEmitter, Output, Input, ViewChild,
  ContentChildren, QueryList, HostBinding, HostListener, Self, ElementRef,
} from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from './helpers';
import { UploadService } from './upload.service';
import { UploadPreviewComponent } from './upload-preview/upload-preview.component';

export interface UploadEvent {
  source: UploadComponent;
  addedFiles: File[];
  rejectedFiles: File[];
}

@Component({
  selector: 'alb-upload, [alb-upload]',
  templateUrl: './upload.component.html',
  host: {
    'class': 'alb-upload',
  },

  providers: [UploadService]
})
export class UploadComponent {

  constructor(
    @Self() private service: UploadService
  ) { }

  /** Lista dos componentes preview filhos geradas pelo conteúdo. */
  @ContentChildren(UploadPreviewComponent, { descendants: true })
  _previewChildren: QueryList<UploadPreviewComponent>;

  get _hasPreviews(): boolean {
    return !!this._previewChildren.length;
  }

  /** Uma referência para o elemento input file nativo. */
  @ViewChild('fileInput', { static: true }) _fileInput: ElementRef;

  /** Emitido quando algum arquivo foi adicionado ou removido. */
  @Output() readonly change = new EventEmitter<UploadEvent>();

  /** Defina os tipos de arquivo aceitos. O padrão é para qualquer arquivo '*'. */
  @Input() accept = '*';

  @Input() description = '';

  /** Desative qualquer interação do usuário com o componente. */
  @Input()
  @HostBinding('class.ngx-dz-disabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    if (this._isHovered) {
      this._isHovered = false;
    }
  }
  private _disabled = false;

  /** Permitir a seleção de vários arquivos. */
  @Input()
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }
  private _multiple = true;

  /** Defina o tamanho máximo que um único arquivo pode ter. */
  @Input()
  get maxFileSize(): number {
    return this._maxFileSize;
  }
  set maxFileSize(value: number) {
    this._maxFileSize = coerceNumberProperty(value);
  }
  private _maxFileSize: number = undefined;

  /** Permitir que o contêiner se expanda verticalmente. */
  @Input()
  @HostBinding('class.expandable')
  get expandable(): boolean {
    return this._expandable;
  }
  set expandable(value: boolean) {
    this._expandable = coerceBooleanProperty(value);
  }
  private _expandable = false;

  /** Permitir que abra o seletor de arquivos ao clicar. */
  @Input()
  @HostBinding('class.unclickable')
  get disableClick(): boolean {
    return this._disableClick;
  }
  set disableClick(value: boolean) {
    this._disableClick = coerceBooleanProperty(value);
  }
  private _disableClick = false;

  /** Expõe id, aria-label, aria-labelledby e aria-coveredby da entrada do arquivo nativo para acessibilidade adequada. */
  @Input() id: string;
  @Input('aria-label') ariaLabel: string;
  @Input('aria-labelledby') ariaLabelledby: string;
  // tslint:disable-next-line: no-input-rename
  @Input('aria-describedby') ariaDescribedBy: string;

  @HostBinding('class.ngx-dz-hovered')
  _isHovered = false;

  /** Mostre o explorador de arquivos do sistema operacional nativo para selecionar arquivos. */
  @HostListener('click')
  _onClick() {
    if (!this.disableClick) {
      this.showFileSelector();
    }
  }

  @HostListener('dragover', ['$event'])
  _onDragOver(event) {
    if (this.disabled) {
      return;
    }

    this.preventDefault(event);
    this._isHovered = true;
  }

  @HostListener('dragleave')
  _onDragLeave() {
    this._isHovered = false;
  }

  @HostListener('drop', ['$event'])
  _onDrop(event) {
    if (this.disabled) {
      return;
    }

    this.preventDefault(event);
    this._isHovered = false;
    this.handleFileDrop(event.dataTransfer.files);
  }

  showFileSelector() {
    if (!this.disabled) {
      (this._fileInput.nativeElement as HTMLInputElement).click();
    }
  }

  _onFilesSelected(event) {
    const files: FileList = event.target.files;
    this.handleFileDrop(files);

    // Redefine o elemento de entrada do arquivo nativo para permitir a seleção do mesmo arquivo novamente
    this._fileInput.nativeElement.value = '';

    // Impedir o comportamento do evento padrão que faz com que o evento de mudança fosse emitido duas vezes.
    this.preventDefault(event);
  }

  private handleFileDrop(files: FileList) {
    const result = this.service.parseFileList(files, this.accept, this.maxFileSize, this.multiple);

    this.change.next({
      addedFiles: result.addedFiles,
      rejectedFiles: result.rejectedFiles,
      source: this
    });
  }

  private preventDefault(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
