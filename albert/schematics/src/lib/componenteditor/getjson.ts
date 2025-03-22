import { Rule, Tree } from "@angular-devkit/schematics";
import { Observable } from "rxjs";
import { ComponentOptions } from "./componenteditor.schema";
import fetch from "node-fetch";

export function getJson(options: ComponentOptions, templateOptions: any): Rule {
  return (host: Tree) => {
    return new Observable<Tree>((observer) => {
      if (options.url) {
        fetch(options.url)
          .then((res: any) => res.json())
          .then((data: any) => {
            let value = data;
            if (Array.isArray(data) && data.length > 0) {
              value = data[0];
            }
            const finalObj: any = {};
            Object.keys(value).forEach((key) => {
              finalObj[key] = typeof value[key];
              if (
                finalObj[key] !== "string" &&
                finalObj[key] !== "boolean" &&
                finalObj[key] !== "number"
              ) {
                finalObj[key] = "string";
              }
            });

            options.obj = finalObj;
            options.data = data.view;

            options.endpoints = data.endpoints;
            options.baseUrlEndpoint = data.baseUrlEndpoint;

            options.componentcreate = options.data.filter((el) => {
              return el.type === "card-component";
            });

            let objComponentTs = createObject(data.view);

            options.variables = objComponentTs.variables;
            options.constructor = objComponentTs.constructor;
            options.code = objComponentTs.code;
            options.formConstructor = objComponentTs.formConstructor;
            options.service = objComponentTs.service;
            options.imports = objComponentTs.imports;

            options.parameters = Object.keys(value);
            templateOptions.parameters = Object.keys(value);

            templateOptions.obj = JSON.stringify(finalObj);
            templateOptions.data = data.view;

            observer.next(host);
            observer.complete();
          })
          .catch((err: any) => {
            console.error(`JSON parse error ${err}`);
            observer.error(err);
          });
      }
    });
  };
}

function createObject(data) {
  let dataObj = data;
  let options = {
    variables: [],
    constructor: [],
    code: [],
    formConstructor: [],
    service: [],
    imports: []
  };

  dataObj = getObjectArray(data);
  for (const obj of dataObj) {
    if (obj.type === "select") {
      options.variables.push(obj);
      options.constructor.push(obj);
      options.code.push(obj);
      options.formConstructor.push(obj);
    }
    if (obj.type === "input") {
      options.formConstructor.push(obj);
      options.code.push(obj);
    }
    if (obj.type === "button" && obj.properties.dialog === true) {
      options.constructor.push(obj);
      options.code.push(obj);
    }
    if (
      obj.type === "datepicker" ||
      obj.type === "timepicker" ||
      obj.type === "datetimepicker"
    ) {
      options.code.push(obj);
      options.variables.push(obj);
      options.formConstructor.push(obj);
    }
    if (obj.type === "table") {
      options.variables.push(obj);
      options.constructor.push(obj);
      options.code.push(obj);
      options.imports.push(obj);
      if(obj.properties.urlData){
        options.service.push(obj);
      }
    }
  }

  return options;
}

function getObjectArray(data) {
  let resp = data.flatMap((obj) => {
    if (obj.type !== "card" 
    && obj.type !== "row" 
    && obj.type !== "col"
    && obj.type !== "tabGroup"
    && obj.type !== "box"
    && obj.type !== "tab"
    ) {
      return obj;
    }
    if (obj.type === "card" || obj.type === "row" 
    || obj.type === "col"
    || obj.type === "box"
    || obj.type === "tabGroup"
    || obj.type === "tab" ) {
      if (obj.hasOwnProperty("children")) {
        return getObjectArray(obj.children);
      }
    }
  });
  return resp;
}
