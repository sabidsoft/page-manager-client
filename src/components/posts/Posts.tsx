import { useGetFacebookPagePostsQuery } from "../../redux/features/api/endPoints/facebookPageEndpoint/facebookPageEndpoint";
import PostCard from "../cards/postCard/PostCard";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";

export default function Page({ facebookPage }: any) {
    const { data, isError, isLoading } = useGetFacebookPagePostsQuery(facebookPage?.pageId as string);

    const posts = data?.data?.posts;
    // const paging = data?.data?.paging;

    if (isLoading) return <Loader />;

    if (!isLoading && isError)
        return <ErrorMessage message="Something went wrong." />;

    if (!isLoading && !isError && posts && posts.length === 0)
        return <ErrorMessage message='Opps! Sorry! There is no post available!' />;

    return (
        <div className="flex flex-col items-center">
            {posts && posts.map((post: any) => <PostCard key={post.id} post={post} facebookPage={facebookPage} />)}
        </div>
    )
}