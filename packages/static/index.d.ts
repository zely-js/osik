import type { Middleware } from 'osik';

export interface StaticOptions {
  prefix?: string;

  ignored?: string[];

  charset?: string;
}
export function Static(target: string, options?: StaticOptions): Middleware;
