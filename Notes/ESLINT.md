## <b><span style='color:#9146ff'>|</span> Links</b>

- [Intro to ESLint | Arabic Video](https://www.youtube.com/watch?v=K9vCqbZ9Wec)
- [ESLint & Prettier Crash course](https://www.youtube.com/watch?v=clU3zb48BtI)
- [Official Website](https://eslint.org/)

---

## <b><span style='color:#9146ff'>|</span> install Tool</b>

- `npm i -D eslint` : we will install it in dev
- Dependencies as it used in development mode
- in Package.json add script `"lint": "eslint ./app --fix"`
- `npm run lint -- --init` : it will create a config file
- run command `npm run lint` in terminal

```
// 1- Install these packages in your dev dependencies using this command:

npm i -D eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-node eslint-plugin-prettier eslint-plugin-react prettier


// 2- Create ".eslintrc.json" file in the root directory with these configration:

{
  "extends": ["airbnb", "prettier", "plugin:node/recommended"],
  "plugins": ["prettier"],
  "rules": {
    // "prettier/prettier": "error",
    "spaced-comment": "off",
    "no-console": "off",
    "consistent-return": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "no-process-exit": "off",
    "no-param-reassign": "off",
    "no-return-await": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "no-undef": "warn",
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    "no-unused-vars": ["warn", { "argsIgnorePattern": "req|res|next|val" }]
  }
}
```
