# Processo de aprovação de Pull Request

Os PR's são padronizados seguindo os padrões do [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)

## Pré-requisitos para aprovação

### Nomenclatura de branchs

O nome para a sua branch deve estar no seguinte padrão: prefixo/**nome-da-tarefa-no-jira**

Prefixos: 
- **fix** -> bug
- **feature** -> features novas
- **test** -> testes
- **build** -> gerar versão
- **docs** -> documentação
- **refactor** -> refatoração do código

Aqui está um exemplo:
  > feature/SQLIBSUI-1-criacao-projeto

### Nomenclatura de commits

Todos os commits dentro da branch devem estar no seguinte padrão: **prefixo**(**projeto**/**componente-alterado**): **descrição-da-alteração**.

Prefixos: 
- **fix** -> bug
- **feature** -> features novas
- **test** -> testes
- **build** -> gerar versão
- **docs** -> documentação
- **refactor** -> refatoração do código

Aqui está um exemplo:
  > feature(angular/sq-button): adiciona sq-button.

### Sem Conflitos

Antes de fazer o PR, é necessário que a sua branch não tenha nenhum tipo de conflito com a branch que receberá o merge. Somente depois do cumprimento dessa exigência os arquivos de códigos serão analisados. 

Para isso, você deve fazer um pull para a sua branch a partir da branch develop. Para saber se a sua branch está atualizada em relação à develop, você pode ir no TFS em Code > Branches > Mine e buscar a branch em questão. Na coluna Behind | Ahead o behind deve estar zerado. No exemplo a seguir, a branch está desatualizada por um commit em relação à develop e deve ser atualizada.

![](./assets/img/outdated-branch.PNG)

### Qualidade de código

#### **Variáveis e métodos com boa nomenclatura e comentados**

Todos os nomes de variáveis, métodos e arquivos devem representar claramente o que está sendo criado ou executado.

Sempre que possível utilize comentários para explicar rapidamente a funcionalidade e objetivo do código, por exemplo:

```javascript
  /**
  * Booleano para identificar se o componente está aberto/fechado
  */
  isOpen = false;
```
<br/>

#### **Verificar se há código desnecessário**

Certificar-se de que o seu PR não possui código desnecessário, por exemplo, **console.log()** ou **variáveis e métodos utilizadas para testes ou que não estão sendo utilizadas**.

### Testes

Por fim, é necessário fazer alguns testes para garantir que a sua alteração não irá quebrar o processo do Jenkins. Todos os comandos devem ser rodados tanto na pasta angular quanto docs.

#### **Lint**

```shell
npm run lint
```

Caso o lint encontre algum problema, ele irá apresentar no terminal o caminho para o arquivo e o erro encontrado. Você deve corrigi-los e rodar o comando mais uma vez.

![](./assets/img/lint-error.png)

 Estará tudo certo quando o terminal apresentar a mensagem "All files pass linting".

 ![](./assets/img/lint-success.PNG)

#### **Build**
<br/>

* Para a pasta angular:

```shell
npx lerna run build
```

* Para a pasta docs:

```shell
npm run build
```

Caso o comando apresente algum erro, verifique e corrija o que for necessário. 

Se você tiver criado ou alterado alguma documentação de componente da biblioteca, esse comando irá refletir essas alterações no projeto da documentação, criando mais um arquivo que precisa ser commitado antes de criar o PR.

## Como criar um PR

Com todos os requisitos acima cumpridos, agora você deve criar o PR no TFS. Para isso, dentro do projeto no TFS, acesse Code > Branches > Mine e encontre a branch desejada. Passe o mouse pela coluna Pull Request e clique em **New pull request**. Ou vá até a aba Pull Requests, clique em **New pull request** e selecione a branch para a qual deseja fazer o PR.

![](./assets/img/new-pr.PNG)

* A branch selecionada após "into" deve ser a que você deseja fazer o merge da sua branch, nesse caso deve estar selecionada develop. 
* Ajuste o título do PR para ficar apenas o nome da sua branch.
* Coloque na descrição o que você criou/alterou no projeto.
* Clique em create e o seu PR já estará criado.
* Vá até o [canal do Albert na guilda de Front](https://teams.microsoft.com/l/channel/19%3aaa868053f487455d95d9377a83cbd391%40thread.skype/Albert?groupId=213b33cf-1a9f-47ee-82fb-d75f652321cc&tenantId=6c323b1c-4f63-4552-a20f-6d0da0bbf032) e crie uma nova conversa mencionando **general**, colando a descrição e o link do PR conforme exemplo abaixo.

![](./assets/img/pr-new-conversation.PNG)

Agora é só aguardar que o seu PR seja aprovado por um dos Core Commiters do projeto. Caso a pessoa que for aprovar o seu PR veja necessidade, ela poderá te convidar para uma reunião na qual você explicará as alterações realizadas e responderá as possíveis dúvidas que tenham surgido. 

Se estiver tudo certo, o PR estará pronto e é só aguardar o lançamento da próxima versão do Albert para que a sua alteração na biblioteca possa ser utilizada por todos!

Caso você tenha urgência de utilizar/apresentar a alteração realizada no seu projeto, basta solicitar a um Core Commiter que lance um snapshot.

