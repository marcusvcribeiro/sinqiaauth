import { Component, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { coerceBooleanProperty } from '../helpers';
import { DomSanitizer } from '@angular/platform-browser';

enum KEY_CODE {
BACKSPACE = 'Backspace',
DELETE = 'Delete'
}

@Component({
  selector: 'alb-upload-preview',
  templateUrl: './upload-preview.component.html',
  host: {
    'class': 'alb-upload-preview',
  }
})
export class UploadPreviewComponent {

  constructor(
    protected sanitizer: DomSanitizer
  ) { }

  /** O arquivo para visualização. */
  @Input()
  set file(value: File) { this._file = value; }
  get file(): File { return this._file; }

    /** Permitir que o usuário remova arquivos */
 @Input()
 get removable(): boolean {
  return this._removable;
 }
  set removable(value: boolean) {
   this._removable = coerceBooleanProperty(value);
 }


 protected _file: File;
 protected _removable = false;

 /** Emitido quando o elemento deve ser removido. */
 @Output() readonly removed = new EventEmitter<File>();

  /** Torna o item de visualização focalizado usando a tecla tab. */
 @HostBinding('tabindex') tabIndex = 0;

 @HostListener('keyup', ['$event'])
 keyEvent(event: KeyboardEvent) {
   switch (event.key) {
    case KEY_CODE.BACKSPACE:
      case KEY_CODE.DELETE:
        this.remove();
        break;
      default:
        break;
    }
  }

 /** Método remover usado do modelo. */
 _remove(event) {
    event.stopPropagation();
    this.remove();
 }

  /** Remove o item de visualização (use do código do componente). */
  remove() {
    if (this._removable) {
      this.removed.next(this.file);
    }
  }

  protected async readFile(): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
      resolve((e.target as FileReader).result);
    };

      reader.onerror = e => {
      console.error(`FileReader falhou no arquivo ${this.file.name}.`);
      reject(e);
      };

      if (!this.file) {
      return reject('Nenhum arquivo para ler. Forneça um arquivo usando a propriedade Input [arquivo].');
    }

      reader.readAsDataURL(this.file);
  });
 }
}
