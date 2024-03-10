export function cleanArray<T>(arr: (T | undefined)[] | undefined): T[] {
  const filteredArray: T[] = Array.from(
    new Set(arr?.filter((item): item is T => item !== undefined))
  );
  return filteredArray;
}
