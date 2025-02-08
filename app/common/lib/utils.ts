export const pipe =
  <T>(...functions: Array<(arg: any) => T | Promise<T>>) =>
  async (initialValue?: any): Promise<T> =>
    functions.reduce(
      async (promise, fn) => fn(await promise),
      Promise.resolve(initialValue === undefined ? null : initialValue)
    );
