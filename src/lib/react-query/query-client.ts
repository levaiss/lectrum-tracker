// Core
import { QueryClient, QueryOptions } from 'react-query';
import axios from 'axios';

// Other
import { TODO_API_URL } from '../../api';

const defaultQueryFn = async (options: QueryOptions) => {
    const { queryKey } = options;

    let endpoint = queryKey?.[ 0 ];

    if (queryKey && queryKey?.length > 1) {
        for (const key of queryKey.slice(1)) {
            endpoint += `/${key}`;
        }
    }

    const response = await axios.get(
        `${TODO_API_URL}/${endpoint}`,
    );

    return response.data;
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn:              defaultQueryFn,
            refetchOnWindowFocus: false,
        },
    },
});
