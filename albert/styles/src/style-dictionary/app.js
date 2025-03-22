const fs = require("fs");
const styleDictionary = require("style-dictionary");
const { fileHeader } = styleDictionary.formatHelpers;

const lightThemeJson = './tokens/tokens-light.json';
const darkThemeJson = './tokens/tokens-dark.json';
const tokensPath = '../styles/core/design-tokens/';

styleDictionary.registerFormat({
    name: 'scss/class',
    formatter: function ({ dictionary, file }) {
        var format = fileHeader({ file });
        dictionary.allProperties.forEach(token => {
            format += `\n\n.${token.name} {`;
            for (const key in token.value) {
                format += `\n${key}: ${token.value[key]};`;
            }
            format += '\n}';
        });
        return format;
    }
});

fs.readFile(lightThemeJson, "utf8", function (error, data) {
    if (error) throw `Ocorreu um erro ao ler o JSON: ${error}`;

    let parsedData = JSON.parse(data);
    for (const key in parsedData) {
        const lightThemeStyleDictionary = styleDictionary.extend({
            source: [lightThemeJson],
            platforms: {
                scss: {
                    transformGroup: "scss",
                    buildPath: tokensPath,
                    files: [
                        {
                            destination: `${key}.scss`,
                            format: key === 'typography' ? "scss/class" : 'scss/variables',
                            filter: {
                                attributes: {
                                    category: key
                                }
                            }
                        }
                    ]
                }
            }
        });
        lightThemeStyleDictionary.buildAllPlatforms();
    }
});

const darkThemeStyleDictionary = styleDictionary.extend({
    source: [darkThemeJson],
    platforms: {
        scss: {
            transformGroup: "scss",
            buildPath: tokensPath,
            files: [
                {
                    destination: `color-dark.scss`,
                    format: 'scss/variables',
                    filter: {
                        attributes: {
                            category: 'color'
                        }
                    }
                }
            ]
        }
    }
});

darkThemeStyleDictionary.buildAllPlatforms();

