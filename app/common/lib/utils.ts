/* eslint-disable @typescript-eslint/no-explicit-any */

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

export const cn = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(" ");
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getDetailLink = (type: "movie" | "tv", id: number) => {
  return `/${type}/${id}`;
};
