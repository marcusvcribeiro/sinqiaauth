import { Path } from '@angular-devkit/core';
import { Props } from './componentprops.schema';

export interface ComponentOptions {
  /**
   * @description
   * The name of the component.
   */
  name: string;
  /**
   * @description
   * The path to create the component.
   */
  path?: string | Path;
  /**
   * @description
   * The path to insert the component declaration.
   */
  module?: Path;
  /**
   * @description
   * Directive to insert declaration in module.
   */
  skipImport?: boolean;
  /**
   * @description
   * Metadata name affected by declaration insertion.
   */
  metadata?: string;
  /**
   * @description
   * Element type name
   */
  type?: string;
  /**
   * @description
   * Application language.
   */
  language?: string;
  /**
   * @description
   * The source root path
   */
  sourceRoot?: string;
  /**
   * @description
   * Specifies if a spec file is generated.
   */
  spec?: boolean;
  /**
   * @description
   * Specifies if a scss file is generated.
   */
  scss?: boolean;
  /**
   * @description
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
  /**
   * @description
   * Data for read from Json and pass to options.
   */
  data?: Array<ComponentOptions>;
  /**
   * @description
   * Url grom Editor Json.
   */
  url?: string;
  /**
   * @description
   * Obj for read from Json and pass to options.
   */
  obj?: Props;
  /**
   * @description
   * Parameters to passo for the processor.
   */
  parameters?: any;
  /**
   * @description
   * Parameters from the nodes with flag card-component.
   */
  componentcreate?: Array<ComponentOptions>;
  /**
   * @description
   * Properties of the component in Json.
   */
  properties?: any;
  /**
   * @description
   * Children of the component in Json.
   */
  children?: any;
  /**
   * @description
   * Endpoints of the component in Json.
   */
  endpoints?: Array<any>;
  /**
   * @description
   * Url of the endopoint to mount services.
   */
  baseUrlEndpoint?: string;

  /**
   * @description
   * Variables of the component.
   */
  variables?: any;
  
  /**
   * @description
   * Constructor of the component.
   */
  constructor?: any;
  
 /**
   * @description
   * Code of the component.
   */
  code?: any;
   
 /**
   * @description
   * FormGroup of the component.
   */
  formConstructor?: any;

  /**
   * @description
   * Service of the component.
   */
  service?: any;

  /**
   * @description
   * Imports of the component.
   */
  imports?: any;
}
