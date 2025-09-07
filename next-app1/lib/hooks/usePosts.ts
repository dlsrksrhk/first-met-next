import useSWR from "swr";
import fetcher from "@/lib/fetcher/fetcher";

function usePosts() {
    const {data, error, isLoading, mutate} = useSWR<MyNextApp.Post[]>('/api/posts', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    };
}

export default usePosts;