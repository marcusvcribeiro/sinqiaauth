import { Path } from '@angular-devkit/core';

export interface ServiceOptions {
  /**
   * The name of the component.
   */
  name: string;
  /**
   * The path to create the component.
   */
  path?: string | Path;
  /**
   * The path to insert the component declaration.
   */
  spec?: boolean;
  metadata?: string;
  type?: string;
  endpoints?: any;
  servicecreate: any;
  fields?: object[];
}
