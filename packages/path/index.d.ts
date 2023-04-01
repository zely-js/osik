export function pathToRegexp(
  path: string,
  loose: boolean
): { params: string[]; pattern: RegExp };
