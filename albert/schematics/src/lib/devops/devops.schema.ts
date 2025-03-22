import { Path } from '@angular-devkit/core';

export interface DevopsOptions {
  /**
   * The path to create the component.
   */
  path?: string | Path;
  /**
   * Metadata name affected by declaration insertion.
   */
  metadata?: string;
  /**
   * element type name
   */
  type?: string;
  /**
   * spec
   */
  spec?: boolean;
  /**
   * vertical.
   */
  vertical?: string;
  /**
   * productName.
   */
  productName?: string;
  /**
   * projectName.
   */
  projectName?: string;
}
