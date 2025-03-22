import { Path } from '@angular-devkit/core';

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
   * element type name
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
}
