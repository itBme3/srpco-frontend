module.exports = {
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "plugins": ["stylelint-scss"],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
  },
};
