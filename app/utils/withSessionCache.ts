
type CacheKey<TArgs extends readonly unknown[]> =
    | string
    | ((...args: TArgs) => string);

interface CacheOptions<TArgs extends readonly unknown[]> {
    key: CacheKey<TArgs>;
    ttlMs?: number;
}

type CachedValue<T> = {
    data: T;
    expiresAt?: number;
};

type CachedFn<TArgs extends readonly unknown[], TResult> =
  ((...args: TArgs) => Promise<TResult>) & {
    invalidate: (...args: TArgs) => void;
};

export function withSessionCache<
    TArgs extends readonly unknown[],
    TResult
>(
    fn: (...args: TArgs) => Promise<TResult>,
    options: CacheOptions<TArgs>
) {
    const wrapped = (async (...args: TArgs): Promise<TResult> => {
        if (typeof window === 'undefined') {
            return fn(...args);
        }

        const key =
            typeof options.key === 'function'
                ? options.key(...args)
                : options.key;

        try {
            const raw = sessionStorage.getItem(key);
            if (raw) {
                const cached = JSON.parse(raw) as CachedValue<TResult>;

                if (
                    !cached.expiresAt ||
                    cached.expiresAt > Date.now()
                ) {
                    return cached.data;
                }

                sessionStorage.removeItem(key);
            }
        } catch {
            // ignore cache errors
        }

        const result = await fn(...args);

        try {
            const payload: CachedValue<TResult> = {
                data: result,
                expiresAt: options.ttlMs
                    ? Date.now() + options.ttlMs
                    : undefined,
            };

            sessionStorage.setItem(key, JSON.stringify(payload));
        } catch {
            // quota / private mode
        }

        return result;
    }) as CachedFn<TArgs, TResult>;

    wrapped.invalidate = (...args: TArgs) => {
        const key =
            typeof options.key === 'function'
                ? options.key(...args)
                : options.key;

        sessionStorage.removeItem(key);
    };

    return wrapped;
}
