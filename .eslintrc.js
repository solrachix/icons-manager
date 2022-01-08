module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: "module"
  },
  plugins: [
    "react",
    "prettier",
    "@typescript-eslint"
  ],
  rules: {
    "react/prop-types": "off",
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    "@typescript-eslint/no-var-requires": 'off',
    "@typescript-eslint/ban-ts-comment": 'off',
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never"
      }
    ]
  },
  settings: {
    "import/resolver": {
      typescript: {}
    },
    react: {
      createClass: "createReactClass",
      pragma: "React",
      version: "detect",
      flowVersion: "0.53"
    }
  }
}
