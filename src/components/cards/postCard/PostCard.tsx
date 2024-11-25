import { useState } from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import defaultProfilePicture from "../../../assets/default_avatar.png";
import { useGetFacebookPagePostInsightsQuery } from "../../../redux/features/api/endPoints/facebookPageEndpoint/facebookPageEndpoint";
import { PostCardProps } from "./types";
import PostInsightsModal from "../../modal/postInsightsModal/PostInsightsModal";



export default function PostCard ({ post, facebookPage }: PostCardProps) {
    const { data } = useGetFacebookPagePostInsightsQuery({
        pageId: facebookPage?.pageId as string,
        postId: post?.id as string
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const insights = data?.data?.insights || [];

    // Format the dates
    const createdTimeAgo = post?.created_time
        ? formatDistanceToNow(parseISO(post?.created_time), { addSuffix: true })
        : "N/A";
    const createdTime = post?.created_time
        ? format(parseISO(post?.created_time), "h:mm:ss a - MMM d, yyyy")
        : "N/A";
    const updatedTime = post?.updated_time
        ? format(parseISO(post?.updated_time), "h:mm:ss a - MMM d, yyyy")
        : "N/A";

    return (
        <div className="bg-[#fff] w-[700px] mb-5 rounded-xl shadow relative">
            <div className="flex justify-between items-center px-4 pt-4">
                <div className="flex">
                    <img
                        src={facebookPage?.pageProfilePicture ?? defaultProfilePicture}
                        alt="Profile_Picture"
                        width={40}
                        height={40}
                        className="rounded-full border border-blue-500"
                    />
                    <div className="ml-2">
                        <h3 className="text-[#050505] text-sm font-semibold">{facebookPage?.pageName}</h3>
                        <p className="text-[#B0B3B8] text-xs">{createdTimeAgo}</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className=" text-[#2d68bb] font-semibold hover:underline"
                >
                    Show Insights
                </button>
            </div>

            {/* Message */}
            <div className="px-4 py-4">{post?.message && <p>{post?.message}</p>}</div>
            <div>
                {/* Photo */}
                {post?.attachments?.data?.[0]?.type === "photo" &&
                    post?.attachments?.data?.[0].media?.image?.src && (
                        <img
                            src={post?.attachments?.data?.[0].media?.image?.src}
                            alt="Post_Photo"
                            className="w-full max-h-[400px] object-cover"
                        />
                    )}

                {/* Video */}
                {post?.attachments?.data?.[0]?.type === "video_inline" &&
                    post?.attachments?.data?.[0].media?.source && (
                        <video controls className="w-full max-h-[400px]">
                            <source src={post?.attachments?.data?.[0].media?.source} />
                        </video>
                    )}

                {/* Shared Video (YouTube) */}
                {post?.attachments?.data?.[0]?.type === "share" &&
                    post?.attachments?.data?.[0].media?.source && (
                        <iframe
                            width="100%"
                            height="400"
                            src={post?.attachments?.data?.[0].media?.source}
                            title="YouTube video player"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}
            </div>

            {/* Permalink */}
            {post?.permalink_url && (
                <div className="px-4 pt-3 text-center">
                    <a
                        href={post?.permalink_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#2d68bb] font-semibold hover:underline"
                    >
                        See Original Post
                    </a>
                </div>
            )}

            {/* Timestamps */}
            <div className="flex justify-between pb-3 px-4">
                <div>
                    <h5 className="text-sm font-semibold">Post Created</h5>
                    <p className="text-[#777] text-xs">{createdTime}</p>
                </div>
                {createdTime !== updatedTime && (
                    <div>
                        <h5 className="text-sm font-semibold text-right">Last Updated</h5>
                        <p className="text-[#777] text-xs">{updatedTime}</p>
                    </div>
                )}
            </div>

            {/* Insights Modal */}
            <PostInsightsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                insights={insights}
            />
        </div>
    );
};
