import { useCallback, useEffect, useState } from 'react';

export const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const fetchData = useCallback(async () => {
        setIsPending(true);
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(response.statusText);
            const json = await response.json();
            setData(json);
            setError(null);
        } catch (error) {
            setError(`${error} Could not fetch data`);
        } finally {
            setIsPending(false);
        }
    }, [url]);

    useEffect(() => {
        let isMounted = true;

        const runFetch = async () => {
            setIsPending(true);
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(response.statusText);
                const json = await response.json();
                if (isMounted) {
                    setData(json);
                    setError(null);
                }
            } catch (error) {
                if (isMounted) setError(`${error} Could not fetch data`);
            } finally {
                if (isMounted) setIsPending(false);
            }
        };

        runFetch();

        return () => {
            isMounted = false;
        };
    }, [fetchData, url]);

    return { data, isPending, error, refetch: fetchData };
};
