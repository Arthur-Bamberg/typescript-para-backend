# Adopet 🐾

Bem-vindo ao repositório **Adopet**! Este projeto é uma introdução prática ao uso do TypeScript no desenvolvimento backend, com o objetivo de criar um API para adoção de animais. 🌟

## Conteúdo 📚

- [Introdução](#introdução)
- [Projeto](#projeto)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Introdução

Este repositório fornece exemplos e práticas recomendadas para desenvolver aplicativos backend utilizando TypeScript. Ideal para desenvolvedores que desejam melhorar suas habilidades e garantir um código mais robusto e escalável. 🎯

## Projeto

O projeto consiste em uma API para gerenciar um abrigo de animais, com três entidades principais:

- **Pet**: Representa os animais disponíveis para adoção no abrigo. Inclui informações como nome, idade, raça, entre outros.
- **Adotante**: Representa as pessoas interessadas em adotar um animal do abrigo. Inclui informações como nome, endereço, histórico de adoções, etc.
- **Abrigo**: Representa o abrigo em si, incluindo detalhes sobre sua localização, capacidade, e os pets que estão sob seus cuidados.

## Diagrama ER

![Diagrama ER](./docs/DER%20-%20Adopet.png)

## Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. Clone o repositório:

   ```sh
   git clone https://github.com/Arthur-Bamberg/adopet.git
   ```

2. Navegue até o diretório do projeto:

   ```sh
   cd adopet
   ```

3. Instale as dependências:

   ```sh
   npm install
   ```

## Uso

Para iniciar o servidor de desenvolvimento, use o comando:

```sh
npm run dev
```

O servidor estará disponível em `http://localhost:3000`. 🎉

## Collections de Requisições

- [Run in Postman](./docs/Adopet.postman_collection.json)
- [Run in Insomnia](./docs/insomnia.json)

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```plaintext
├── src
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   └── services
├── tests
├── .gitignore
├── package.json
└── tsconfig.json
```

- **src/controllers**: Controladores da aplicação.
- **src/middlewares**: Middlewares para processamento de requisições.
- **src/models**: Definições de modelos e esquemas.
- **src/routes**: Definições de rotas da aplicação.
- **src/services**: Lógica de negócios e serviços auxiliares.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests. Antes de contribuir, por favor, leia as [diretrizes de contribuição](CONTRIBUTING.md). 🤝

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE). 📄

---

Vamos codar! 💻🚀
