# Upload

O componente **alb-upload** É utilizado para realizar o upload de arquivos. Ele devolve no evento onChange uma lista com os arquivos carregados. Permite personalização de descrição, tipo de arquivo e tamanho do arquivo.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Inputs

| Propriedade  | Tipo      | Descrição                                                                                                                                                   |
| ------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| description  | `string`  | Aceita uma `string` que define o _description_ do upload. A descrição por padrão é `'Arraste e solte aqui o arquivo ou Procure o arquivo'`                  |
| accept       | `string`  | Define os tipos de arquivo aceitos (como para um elemento de arquivo nativo). O padrão é `'*'`. Exemplo `accept="image/jpeg,image/jpg,image/png,image/gif"` |
| multiple     | `boolean` | Permite a seleção de vários arquivos de uma vez. O padrão é `true`.                                                                                         |
| maxFileSize  | `number`  | Define o tamanho maximo que um único arquivo deve ter em _bytes_. O Padrão é `undefined`.                                                                   |
| disabled     | `boolean` | Desative qualquer interação do usuário com o componente. O Padrão é `false`.                                                                                |
| disableClick | `boolean` | Evite que o seletor de arquivos seja aberto ao clicar na zona de soltar. O Padrão é `false`.                                                                |

## Outputs

| Propriedade | Tipo                        | Descrição                                                                                                                                                                                                      |
| ----------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| change      | `EventEmitter<UploadEvent>` | Evento emitido quando algum arquivo foi adicionado ou removido do upload. Ele retorna um UploadEvent com as propriedades `souce`: `UploadComponent`, `addedFiles: File []` e `rejectedFiles: RejectedFile []`. |

O `RejectedFile` estende o arquivo nativo e adiciona uma propriedade de motivo opcional para informar por que o arquivo foi rejeitado. Seu valor será `'type'` para o tipo de aceitação errado, `size`, se exceder o tamanho máximo do arquivo ou `no_multiple` se múltiplo for definido como falso e mais de um arquivo for fornecido.

**alb-upload-label**

Este componente não possui atributos ou métodos e atua como um recipiente para o texto do rótulo usando no preview de conteúdo.

**alb-upload-preview**

Este componente mostra uma visualização básica do arquivo quando adicionado dentro do contêiner upload. As visualizações podem ser focalizadas usando a tecla tab e excluídas usando o backspace ou as teclas de exclusão.

Este componente possui as seguintes propriedades de input:

| Propriedade | Tipo      | Descrição                                                                                                                             |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| file        | `file`    | O arquivo que vai ser prévisualizado.                                                                                                 |
| removable   | `boolean` | Permite que o usuário remova arquivos. Necessário para permitir a interação do teclado e mostrar o ícone de remoção ao passar o mouse |

| Propriedade | Tipo                 | Descrição Possui o seguinte evento de saida                                                                                                            |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| removed     | `EventEmitter<File>` | Emitido quando o arquivo é removido (clicando no emblema remover ou pressionando as teclas backspace / delete). Retorna o arquivo da propriedade Input |

## Exemplo de uso

No Template:

### HTML

```html
<alb-upload
  [multiple]="false"
  [maxFileSize]="20"
  [description]="'Documento CNH'"
  (change)="onSelect($event)"
>
  <alb-upload-preview
    *ngFor="let f of files"
    [removable]="true"
    (removed)="onRemove(f)"
  >
    <alb-upload-label>{{ f.name }}</alb-upload-label>
  </alb-upload-preview>
</alb-upload>
```

No componente:

#### TypeScript

```javascript
   files: File[] = [];

  onSelect(event) {

    this.files.push(...event.addedFiles);
  }

  onRemove(event) {

    this.files.splice(this.files.indexOf(event), 1);
  }
```

Se você deseja um único arquivo:

```javascript
  files: File[] = [];

  onSelect(event) {
    this.files.pop();
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {

    this.files.splice(this.files.indexOf(event), 1);
  }
```
