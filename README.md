# Nome do Projeto

Descrição breve do projeto e suas funcionalidades.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Executando o Projeto](#executando-o-projeto)

## Pré-requisitos

Antes de começar, verifique se você possui o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente incluído com o Node.js)

## Instalação

Siga os passos abaixo para instalar o projeto:

1. Clone o repositório:

   ```bash
    git clone [repositorio](https://github.com/luca-henrique/front-end-challenger-task-manager)
    cd nome-do-repositorio
    npm install
   ```

## Configuração do Ambiente

1.Crie um arquivo .env.development na raiz do projeto.
2.Adicione a seguinte variável de ambiente:

```bash
  NEXT_PUBLIC_API=<URL_DA_API>
```

## Executando o Projeto

```bash
   npm run dev
```

### Frontend:

**1 - Interface:**

- Criar um formulário de login.
- Uma tela de gerenciamento de tarefas que permita listar, adicionar, editar e excluir tarefas.
- Exibir mensagens de erro/sucesso em ações do usuário (ex: erro ao autenticar, sucesso ao criar tarefa, etc.).
- Fazer as requisições para o backend via axios ou fetch.
  Autenticação:
- Após o login, armazenar o token JWT no local storage ou cookies.
  Garantir que o token seja incluído no header de todas as requisições ao backend.

## errors

https://medium.com/@sildeswj/how-to-resolve-ant-design-antd-errors-in-next-js-with-jest-testing-692afa836ab6
