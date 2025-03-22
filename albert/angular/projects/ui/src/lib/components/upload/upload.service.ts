import { Injectable } from '@angular/core';

export interface FileSelectResult {

  /** Arquivos adicionados no evento filesAdded. */
  addedFiles: File[];

  /** Arquivos rejeitados no evento filesRejected. */
  rejectedFiles: RejectedFile[];
}

export interface RejectedFile extends File {

  // ** O motivo pelo qual o arquivo foi rejeitado. */
  reason?: RejectReason;
}

export type RejectReason = 'type' | 'size' | 'no_multiple';

/**
 * Este serviço contém a lógica de filtragem a ser aplicada
 * qualquer arquivo eliminado ou selecionado. Se um arquivo corresponde a todos os critérios
 * como tamanho máximo ou tipo, será emitido no evento
 * array AddedFiles, caso contrário, no array Rejeitado.
 */
@Injectable()
export class UploadService {

  parseFileList(files: FileList, accept: string, maxFileSize: number, multiple: boolean): FileSelectResult {

    const addedFiles: File[] = [];
    const rejectedFiles: RejectedFile[] = [];

    for (let i = 0; i < files.length; i++) {
    const file = files.item(i);

    if (!this.isAccepted(file, accept)) {
        this.rejectFile(rejectedFiles, file, 'type');
        continue;
      }

    if (maxFileSize && file.size > maxFileSize) {
        this.rejectFile(rejectedFiles, file, 'size');
        continue;
      }

    if (!multiple && addedFiles.length >= 1) {
        this.rejectFile(rejectedFiles, file, 'no_multiple');
        continue;
      }

    addedFiles.push(file);
    }

    const result: FileSelectResult = {
      addedFiles,
      rejectedFiles
    };

    return result;
  }

  private isAccepted(file: File, accept: string): boolean {

    if (accept === '*') {
      return true;
    }

    const acceptFiletypes = accept.split(',').map(it => it.toLowerCase().trim());
    const filetype = file.type.toLowerCase();
    const filename = file.name.toLowerCase();

    const matchedFileType = acceptFiletypes.find(acceptFiletype => {

    // verifica se há tipo MIME (e.g. image/*)
      if (acceptFiletype.endsWith('/*')) {
      return filetype.split('/')[0] === acceptFiletype.split('/')[0];
    }

      // verifca a extensão do arquivo (e.g. .csv)
      if (acceptFiletype.startsWith('.')) {
      return filename.endsWith(acceptFiletype);
      }

    // verifica a correspondência exata do tipo MIME (e.g. image/jpeg)
      return acceptFiletype === filetype;
      });

    return !!matchedFileType;
  }

  private rejectFile(rejectedFiles: RejectedFile[], file: File, reason: RejectReason) {

    const rejectedFile = file as RejectedFile;
    rejectedFile.reason = reason;

    rejectedFiles.push(rejectedFile);
  }
}
