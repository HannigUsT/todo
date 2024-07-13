# 1 - Descrição

    Deve-se criar uma aplicação de lista de atividades (TODO).
    A aplicação dever possuir os seguintes comportamentos:

* [X] - Criar tarefas
* [X] - Editar tarefas.
* [X] - Excluir tarefas
* [X] - Concluir atividade e voltar elas da conclusão.

# 2 - Tecnologias

### 2.1 - Frontend

* [X] Angular.io - <https://angular.io/>

### 2.2 - Backend

* [X] NodeJS - <https://nodejs.org/en/>

* [X] ExpressJS - <https://expressjs.com/pt-br/>

* [X] Prisma - <https://www.prisma.io/>

### 2.3 - Banco de dados

* [X] PostgreSql - <https://www.postgresql.org/>

# 3 - Requisitos

### 3.1 - Frontend

#### 3.1.1 - Descrição

    A interface com o usuário deve permitir a manipulação da atividades tendo os seguintes recursos.

#### 3.1.2 - Recursos

* [X] Deve possibilitar o usuário criar uma nova atividade.

* [X] Deve possuir uma lista com as atividades não concluídas.
  * [X] A lista deve estar ordenada por ordem de criação decrescente.
  * [X] No item da lista deve possuir a descrição da atividade.
  * [X] No item da lista deve possuir uma forma de concluir a atividade.
  * [X] No item da lista deve possuir uma forma de excluir a atividade.
* [X] Deve possuir uma lista com as atividades já concluídas.
  * [X] A lista deve estar ordenada por ordem de conclusão decrescente.
  * [X] No item da lista deve possuir a descrição da atividade.
  * [X] No item da lista deve possuir uma forma de voltar a a atividade para não concluída.
  * [X] No item da lista deve possuir uma forma de excluir a atividade.

<!-- #### 3.1.3 Modelo
[TODO] = Adicionar o link da especificação da tela. -->

#### 3.1.3 - Observações

    A interface pode ser feita da forma que desejar atendendo os recursos listados na sessão #3.1.2.
<!-- Não sendo necessário seguir o modelo da sessão 3.1.3 -->
### 3.2 - Backend

#### 3.2.1 - Descrição

    O backend deve possuir as seguintes funcionalidades.

#### 3.2.2 - Funcionalidades

* [X] Atividade
  * [X] Criar atividade.
  * [X] Atualizar atividade.
  * [X] Excluir atividade.
  * [X] Listar atividade.

#### 3.2.3 - Observações

* Outras funcionalidades podem ser criadas para atender as necessidades do projeto.

### 3.3 Banco de dados

#### 3.3.1 - Descrição

    A aplicação deve possuir as seguintes entidades de banco de dados:

#### 3.3.2 - Tabelas

* [X] Atividade
  * [X] id - Inteiro, Auto incremento, NOT NULL
  * [X] descrição - Texto, NOT NULL
  * [X] concluído - Boolean , NOT NULL
  * [X] data criação - Data , NOT NULL
  * [X] data conclusão - Data

# 4 - Entrega

    A entrega pode ser realizada usando uma das formas abaixo:

# 4.1 Git

* Crie um repositorio publico em qualquer sistema de repositorio (Github, Gitlab, Bitbucket , etc).
* Crie o seu projeto nesse repositorio.
* Ao finalizar envia por e-mail para o avaliador o link do repositorio.

# 4.2 ZIP

* Crie um arquivo .zip com seu projeto.
* Ao finalizar envia por e-mail para o avaliador o projeto compactado com o codigo.
