/**
 * Type-safe utility to extract an array of specific property values 
 * from an array of matching objects.
 */
export function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}
