export const pipe =
  <T>(...functions: Array<(arg: any) => T | Promise<T>>) =>
  async (initialValue?: any): Promise<T> =>
    functions.reduce(
      async (promise, fn) => fn(await promise),
      Promise.resolve(initialValue === undefined ? null : initialValue)
    );

export const parallel = <T extends Record<string, Promise<any>>>(
  requests: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }> => {
  return Promise.all(Object.values(requests)).then((results) => {
    return Object.keys(requests).reduce(
      (acc, key, index) => ({
        ...acc,
        [key]: results[index],
      }),
      {} as { [K in keyof T]: Awaited<T[K]> }
    );
  });
};

export const randomize = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};
