# Como Contribuir

A evolução do **Albert** depende muito da sua colaboração e do seu feedback. Então sinta-se livre para expor suas ideias no canal **Projeto - Albert Angular**, na equipe **IT Community** no Teams e, caso encontre alguma dificuldade, você pode entrar em contato com os mantenedores do projeto.

Antes de qualquer modificação no projeto deve haver uma conversa no canal para o alinhamento e melhor abordagem das modificações.

## Kanban Albert

Todas as atividades relacionadas ao **Albert** podem ser acompanhadas através do seguinte quadro Kanban: [SQ LIBs UI](https://jira.sinqia.com.br/secure/RapidBoard.jspa?rapidView=675&projectKey=SQLIBSUI). Antes de começar a mexer no Albert é importante criar um card no quadro com a alteração que você realizará na biblioteca.

## Repositório Albert

O projeto Albert pode ser clonado a partir do seguinte repositório [TFS Albert](https://tfs.seniorsolution.com.br/PD/Albert/_git/alb-front?_a=readme).

Dentro desse repositório há os seguintes sub-repositórios, dentro dos quais encontra-se seu respectivo arquivo **README.md** para maiores detalhes:

### Angular

Repositório onde se encontram os projetos contendo componentes exclusivos para uso do angular. Atualmente há os projetos **authentication, dashboard, layout, ui e playground**.

### Docs

Repositório responsável pela documentação de tudo criado na biblioteca Albert. Sempre que houver alguma mudança nos componentes do Albert, devemos nos certificar que a documentação está atualizada.

### Styles

Repositório responsável por conter os arquivos de estilo utilizados na biblioteca Albert. Os estilos devem estar dentro da pasta **src/styles**.

## Mão na massa

### Pré-requisitos

* Acesso ao [kanban do Albert](https://jira.sinqia.com.br/secure/RapidBoard.jspa?rapidView=675&projectKey=SQLIBSUI)
* Acesso ao [TFS Albert](https://tfs.seniorsolution.com.br/PD/Albert/_git/alb-front?_a=readme)
* Git
* Um editor de texto (recomenda-se o *Visual Studio Code*)
* Node.js ^13.0.0
* Angular 9.0.0

### Criando uma branch

Após clonar o projeto em sua máquina e configurar o ambiente, é muito importante criar a sua própria branch a partir da develop para trabalhar nas suas alterações. Assim poderá realizar commits livremente e não correr o risco de perder alterações que existirem apenas localmente.

O nome para a sua branch deve seguir o seguinte padrão: prefixo/**nome-da-tarefa-no-jira**

Prefixos: 
- **fix** -> bug
- **feature** -> features novas
- **test** -> testes
- **build** -> gerar versão
- **docs** -> documentação
- **refactor** -> refatoração do código

Aqui está um exemplo:
  > feature/SQLIBSUI-1-criacao-projeto

### Criando e alterando componentes

Para ver o guia de como criar ou alterar componentes no Albert, acesse [Criando e alterando componentes](https://dev.sinqia.io/albert/docs/utils/creating-components).

### Pull Request

Durante o desenvolvimento no Albert, fique atento a sempre seguir os padrões para aprovação do seu futuro Pull Request, para mais informações acesse o link: [Aprovação de PR](https://dev.sinqia.io/albert/docs/utils/pr-process).

### Publicação

O processo de versionamento e publicação de uma nova versão do Albert é realizado pelos Core Commiters do projeto e pode ser visualizado clicando [aqui](https://dev.sinqia.io/albert/docs/utils/versioning).


