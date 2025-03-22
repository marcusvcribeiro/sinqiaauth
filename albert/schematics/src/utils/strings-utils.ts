import * as stringUtil from '@angular-devkit/core';
import * as pluralUtil from 'pluralize';

function classify(value: string): string {
    return stringUtil.strings.classify(value);
}

function dasherize(value: string): string {
    return stringUtil.strings.dasherize(value);
}

function camelize(value: string): string {
    return stringUtil.strings.camelize(value);
}

function capitalize(value: string): string {
    return stringUtil.strings.capitalize(value);
}

function decamelize(value: string): string {
    return stringUtil.strings.decamelize(value);
}

function underscore(value: string): string {
    return stringUtil.strings.underscore(value);
}

function pluralize(value: string): string {
    return pluralUtil.plural(value);
}

function singularize(value: string): string {
    return pluralUtil.singular(value);
}

function absoluteSrcPath(value: string): string {
    const index = value.indexOf('src');
    if (index >= 1) {
        return value.substr(index);
    }
    return value;
}

function upperCamelCase(str:string): string{
    str = camelize(dasherize(str));
    return str[0].toUpperCase() + str.substr(1);
}

export const stringsUtils = {
    classify,
    dasherize,
    camelize,
    capitalize,
    decamelize,
    underscore,
    pluralize,
    singularize,
    absoluteSrcPath,
    upperCamelCase
};
