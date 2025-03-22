# Tabela

O componente de Tabelas utilizado no Albert é o table do **PrimeNG**. Para utilização deste componente, basta seguir os seguintes passos:

## Passo 1

Caso ainda não tenha instalado o **PrimeNG** no seu projeto, [clique aqui](https://www.npmjs.com/package/primeng) para baixar a versão compatível com o seu projeto.

*Além disso, atualmente o PrimeNG está dando erro no build caso você não instale as seguintes dependências separadamente (Verificar se a versão que você está utilizando também ocorre essse erro):
1) [chart.js](https://www.npmjs.com/package/chart.js?activeTab=readme)
2) [quill](https://www.npmjs.com/package/quill)
3) [@fullcalendar](https://www.npmjs.com/package/@fullcalendar/core)

## Passo 2

No seu arquivo **module.ts**, importar o seguinte módulo: **TableModule** de 'primeng/table'

## Passo 3

Caso ainda não tenha instalado o pacote **Styles** do Albert, seguir o [**passo 4** do Get-Started](https://dev.sinqia.io/albert/docs/utils/get-started). É nescessário instalar o pacote styles do Albert, pois ele ja possui todos os estilos nescessários para utilização da tabela

## Mais informações

Para mais informações e detalhes de como usar o **PrimeNG**, [clique aqui](https://primefaces.org/primeng/showcase/#/table)

## Exemplo de uso

**Lembrar de sempre adicionar a classe 'alb-table' na tag p-table**

### HTML

```html
<p-table
  class="alb-table"
  [value]="dataSource"
  [showCurrentPageReport]="true"
  currentPageReportTemplate="Mostrando {first} ao {last} de {totalRecords} registros"
  [rows]="2"
  [rowsPerPageOptions]="[2, 10, 20]"
  [totalRecords]="totalRecords"
  [paginator]="true"
  [lazy]="true"
  (onLazyLoad)="loadData($event)"
  [loading]="loading">
  <ng-template pTemplate="header">
    <tr>
      <th *ngFor="let col of cols">
        {{ col.field }}
      </th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-dataSource>
    <tr>
      <td *ngFor="let col of cols">
        {{ dataSource[col.field] }}
      </td>
    </tr>
  </ng-template>
  <ng-template let-item pTemplate="paginatordropdownitem">
    {{ item.value }} - por página
  </ng-template>
</p-table>
```

```javascript
  dataSource = [];
  data = [
    {
      id: 1,
      nome: "Brasil",
      sigla: "BRZ"
    },
    {
      id: 2,
      nome: "Chile",
      sigla: "CL"
    },
    {
      id: 3,
      nome: "Bélgica",
      sigla: "BE"
    }
  ];
  cols = [
    { field: 'nome', header: 'nome' },
    { field: 'sigla', header: 'sigla' },
  ];
  first = 1;
  rows = 2;
  totalRecords = 3;
  loading: boolean;

```

```javascript
  loadData(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.data) {
        this.dataSource = this.data.slice(
          event.first,
          event.first + event.rows
        );
        this.loading = false;
      }
    }, 1000);
  }
  ```