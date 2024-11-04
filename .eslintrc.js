module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@next/next/recommended",
        "airbnb",
        "next/core-web-vitals",
        "prettier",
        "plugin:jsx-a11y/recommended",
    ],
    plugins: ["react", "prettier"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
    },
    rules: {
        "no-underscore-dangle": "off",
        "import/prefer-default-export": "off",
        "react/jsx-no-bind": "off",
        "react/no-unescaped-entities": "off",
        "prettier/prettier": "error",
        "react/react-in-jsx-scope": "off",
        "react/jsx-props-no-spreading": "off",
        "react/forbid-prop-types": "off",
        "object-shorthand": "off",
        "no-use-before-define": "off",
        "react/require-default-props": [
            "error",
            {
                ignoreFunctionalComponents: true,
            },
        ],
        "react/jsx-pascal-case": [
            2,
            {
                ignore: ["UNSAFE_Combobox"],
            },
        ],

        singleQuote: "off",

        //TODO: Fix these errors!
        "consistent-return": "warn",
        "react/jsx-filename-extension": "warn",
        "import/no-cycle": "warn",
        "react/jsx-no-constructed-context-values": "warn",
        "jsx-a11y/anchor-is-valid": "warn",
        "react/no-array-index-key": "warn",
        "jsx-a11y/no-static-element-interactions": "warn",
        "jsx-a11y/click-events-have-key-events": "warn",
    },
    settings: {
        "import/resolver": {
            alias: {
                extensions: [".js", ".jsx"],
                map: [["@/app", "./src/app"]],
            },
        },
        "jsx-a11y": {
            polymorphicPropName: "as",
            components: {
                BodyLong: "p",
                BodyShort: "p",
                Button: "button",
                CheckboxGroup: "fieldset",
                Checkbox: "input",
                Chips: "ul",
                Heading: "h",
                Icon: "svg",
                IconButton: "button",
                Image: "img",
                Input: "input",
                Link: "a",
                List: "ul",
                ListItem: "li",
                NextImage: "img",
                NextLink: "a",
                Pagination: "nav",
                RadioGroup: "fieldset",
                Radio: "input",
                Select: "select",
                TextField: "input",
                Textarea: "textarea",
                Tooltip: "button",
            },
        },
    },
};
