# Kruger Employees Front End App

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Project Name

## Brief description of what this project does and who it's for.
Prerequisites

Before you begin, ensure you have met the following requirements:

    Node.js installed (preferably the latest LTS version)
    Yarn package manager (This project uses Yarn for dependency management)

Getting Started

To get a local copy up and running, follow these simple steps.
Installation

    Clone the repository:

    git clone https://github.com/alejandrotoledoweb/kruger_employees_reactjs.git

Navigate into the project directory:


    cd kruger_employees_reactjs

Install the project dependencies using Yarn:


    yarn install

Running the App

To start the development server:

    yarn dev

This command will compile your TypeScript app and serve it locally. By default, Vite serves the app on http://localhost:5173, but this can vary based on your configuration. Check the terminal output to be sure.
Building for Production

To create a production build:

    yarn build


Deployment

Provide instructions on how to deploy the production build of the app. This might vary greatly depending on the hosting service (Netlify, Vercel, AWS, etc.) and the specifics of your project.
Contributing

If you have suggestions for how to improve the app, or want to contribute to the development, consider the following steps:

    Fork the project repository.
    Create a new branch (git checkout -b feature/AmazingFeature).
    Make your changes and commit them (git commit -m 'Add some AmazingFeature').
    Push to the branch (git push origin feature/AmazingFeature).
    Open a pull request.

License

Distributed under the MIT License. See LICENSE file for more information.
Contact

Your Name - atoledofr@gmail.com

Project Link: https://github.com/alejandrotoledoweb/kruger_employees_reactjs

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
