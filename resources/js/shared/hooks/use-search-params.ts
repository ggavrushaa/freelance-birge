export const useSearchParams = () => {
    const params = new URLSearchParams(window.location.search);
    const set = (name: string, value: string) => {
        params.set(name, value);
        window.history.replaceState(null, '', `?${params.toString()}`);
    };
      const remove = (name: string) => {
        params.delete(name);
        const queryString = params.toString();
        window.history.replaceState(null, '', queryString ? `?${queryString}` : window.location.pathname);
    };
    return {
        params,
        set,
        remove,
    };
};
