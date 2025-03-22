# alb-angular

O projeto alb-angular é uma lib desenvolvida totalmente nos padrões Angular, baseado no Design System da Sinqia. Ela possui os principais componentes visuais.

A lib é dividida em vários subprojetos diferentes, tornando assim modular para adaptar a qualquer tipo de projeto. Atualmente, há 2 tipos de projetos principais:

- layout
- ui

## Projetos

### Layout

O projeto **layout** é responsável por gerar os componentes visuais únicos globais de uma aplicação. Eles devem ser centralizados e utilizados em um único lugar, como no `app.component.ts`, por exemplo.
- [Documentação](https://tfs.seniorsolution.com.br/PD/Albert/_git/alb-front?path=%2Fangular%2Fprojects%2Flayout&version=GBdevelop&_a=readme)

### UI

O projeto **ui** é responsável por todos os componentes reutilizáveis do projeto.
- [Documentação](https://tfs.seniorsolution.com.br/PD/Albert/_git/alb-front?path=%2Fangular%2Fprojects%2Fui&version=GBdevelop&_a=readme)

### Playground

O projeto **playground** é onde podemos testar a visualização e uso dos componentes em uma página. Nenhuma alteração feita nele deve ser commitada, pois é apenas para testes locais.

## Dependências

Em alguns componentes e funcionalidades utilizamos dependências:

### Módulos

- [Datefns](https://date-fns.org/)
- [Imask](https://imask.js.org/)

## Contribuindo com o Albert

Toda funcionalidade do Albert possui sua respectiva documentação e casos de testes. Para componentes novos é necessário criá-los e, ao fazer alguma alteração ou correção, verificar se também é necessária alguma atualização em ambos. Além disso, temos uma política de PR com os respectivos requisitos para aprovação.

Para mais informações, acesse [Como contribuir](https://dev.sinqia.io/albert/docs/utils/contributing) e o [Processo de aprovação de PR](https://dev.sinqia.io/albert/docs/utils/pr-process).