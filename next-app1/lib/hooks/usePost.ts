import useSWR from "swr";
import fetcher from "@/lib/fetcher/fetcher";

function usePost(postId: string) {
    const {data, error, isLoading, mutate} = useSWR<MyNextApp.Post>(`/api/posts/${postId}`, fetcher);

    return {
        post : data,
        error,
        isLoading,
        mutate
    };
}

export default usePost;