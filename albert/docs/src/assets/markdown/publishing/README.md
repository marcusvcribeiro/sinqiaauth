# Versionamento

Todas as libs são publicadas no repositório do [Nexus](https://nexus.sinqia.io/js/) da Sinqia.

Para fazer a publicação, alguns passos devem ser seguidos:

## Configurar o lerna na sua máquina.

Para auxiliar no processo de gerar versão estamos utilizando uma ferramenta chamada [Lerna](https://lerna.js.org/). Deve-se instalar a mesma no seu computador.

```shell
npm i lerna -g
```

## Configurar o Commitizen na sua máquina.

O `Lerna` trabalha utilizando como referência para geração das versão o padrão de [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), e para simplificar o processo recomenda-se o uso do [Commitizen-cli](https://github.com/commitizen/cz-cli).
```shell
npm i commitizen -g
```

## Gerar a versão

Para entender o fluxo do versionamento, veja [Semantic Versioning](https://semver.org/lang/pt-BR/).

Para gerar uma nova versão que dará sequência a última versão lançada, utilize os comandos abaixo:

```shell
lerna run build

lerna version --exact --force-publish
```

**Exemplos:**

1.0.0 -> 1.0.1

1.0.0-alpha.10 -> 1.0.0-alpha.11

### Observação:
Se a última versão for pré-lançamento, esse comando irá incrementar a versão mantendo-a como pré-lançamento. Para transformá-la em versão estável será necessário utilizar um dos termos abaixo.

Para indicar ao lerna qual posição do número de versão deve ser incrementada, utilize um dos seguintes termos logo após version:

```shell
lerna version patch --exact --force-publish
lerna version minor --exact --force-publish
lerna version major --exact --force-publish
```

**Exemplos:**

1.0.0 -> 1.0.1

1.0.0 -> 1.1.0

1.0.0 -> 2.0.0

### Versão de pré-lançamento

Caso a última versão lançada tenha sido uma versão estável, será necessário adicionar o termo prerelease após version. Será adicionado automaticamente o prefixo alpha à versão, para personalizá-lo basta utilizar o termo --preid `<prefixo>`.

**Exemplos:**

```shell
lerna version prerelease --exact --force-publish 
lerna version prerelease --exact --force-publish --preid beta
```

1.0.0 -> 1.0.1-alpha.0

1.0.0 -> 1.0.1-beta.0

Para indicar ao lerna qual posição do número de versão deve ser incrementada, utilize um dos seguintes termos no lugar de prerelease:

```shell
lerna version prepatch --exact --force-publish
lerna version preminor --exact --force-publish
lerna version premajor --exact --force-publish
```

**Exemplos:**

1.0.0 -> 1.0.1-alpha.0

1.0.0 -> 1.1.0-alpha.0

1.0.0 -> 2.0.0-alpha.0

Se você desejar que a versão a ser publicada não seja a mais recente a ser instalada pelos usuários (como por exemplo durante o desenvolvimento de uma versão next), será necessário personalizar a tag de distribuição adicionando o termo --pre-dist-tag `<tag>`.

**Exemplo:**

```shell
lerna version prerelease --exact --force-publish --preid next --pre-dist-tag next
```

1.0.0 -> 1.0.1-next.0

### Snapshot

Snapshots são versões mais granularizadas e paralelas aos pacotes oficiais publicados da biblioteca. Eles são gerados para que uma pessoa ou grupo de pessoas específico teste uma versão antes que ela fique disponível a todos os usuários. 

Para gerar um snapshot, rode o seguinte comando:

```shell
lerna publish --canary --preid snapshot --dist-tag snapshot
```

**Exemplo:**

1.0.0 -> 1.0.0-snapshot.5+81e3b443

A numeração após o prefixo representa o número de commits + SHA do git. Entretanto, ao publicar no Nexus ele remove o SHA do nome do pacote e este permanece apenas nos arquivos package.json.

---

Após utilizar um dos comandos acima, o prompt irá indicar as trocas de versão e perguntar se você deseja continuar. Caso tudo esteja certo, basta você aceitar e ele irá commitar as modificações.

Para o caso específico do lançamento de snapshots, o terminal irá apresentar um erro de autenticação no Nexus e as alterações de versão nos arquivos package.json deverão ser commitadas manualmente.

Uma vez que tenham sido commitados os números de versão e tags no git, você deve acessar o [jenkins corportativo](https://jenkins.sinqia.io/job/core-bancario/job/teste-alb-front/) e dar o commando para build com parâmetros. Marque a opção `runNexusPublish` e siga com o build.

Se o build terminar com sucesso a versão terá sido publicada com sucesso no endereço do Nexus.