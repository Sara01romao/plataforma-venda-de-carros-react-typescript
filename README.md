
<h2 align="center"> 💻 Sistema de Vendas de Ingresso de Cinema </h2> 

<p align="center">
  

  <img max-width="auto" height="auto"  src="https://github.com/user-attachments/assets/c88256ac-2f91-4fe1-b983-54b7dd0b6cb2">


</p> 



## 💻  Sobre o Projeto  
Sistema de Venda de Carros desenvolvido com React, TypeScript e Firebase durante o curso de React e TypeScript, com aprimoramentos de 
layout para uma experiência de usuário ainda mais intuitiva e agradável.

Funcionalidades:

- Autenticação: Login/registro de usuários com Firebase.
- Dashboard: Visualização de histórico e carrinho.
- Listagem de Carros: Exibição e filtros de busca.
- Carrinho: Adicionar/remover carros com atualização em tempo real.
- Banco de Dados: Dados sincronizados via Firebase Firestore.



<br>


## :rocket: Tecnologias Usadas


Front-end 
```
REACTJS
TYPESCRIPT
```
Back-end 
```
Firebase
```















# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
