import { format, formatDistanceToNow, parseISO } from "date-fns";
import defaultProfilePicture from "../../../assets/default_avatar.png";

export default function PostCard({ post, facebookPage }: any) {
    // Format the dates
    const createdTimeAgo = post?.created_time ? formatDistanceToNow(parseISO(post?.created_time), { addSuffix: true }) : 'N/A';
    const createdTime = post?.created_time ? format(parseISO(post?.created_time), 'h:mm:ss a - MMM d, yyyy') : 'N/A';
    const updatedTime = post?.updated_time ? format(parseISO(post?.updated_time), 'h:mm:ss a - MMM d, yyyy') : 'N/A';

    return (
        <div className="bg-[#fff] w-[700px] mb-5 rounded-xl shadow">
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
                <div>
                    Test
                </div>
            </div>

            {/* for message */}
            <div className="px-4 py-4">
                {post?.message && <p>{post?.message}</p>}
            </div>
            <div>
                {/* for photo */}
                {
                    post?.attachments?.data?.[0]?.type === 'photo' &&
                    post?.attachments?.data?.[0].media?.image?.src &&
                    <img
                        src={post?.attachments?.data?.[0].media?.image?.src}
                        alt="Post_Photo"
                        className=""
                    />
                }

                {/* for video */}
                {
                    post?.attachments?.data?.[0]?.type === 'video_inline' &&
                    post?.attachments?.data?.[0].media?.source &&
                    <video
                        controls
                        className="w-full max-h-[400px]"
                    >
                        <source src={post?.attachments?.data?.[0].media?.source} />
                    </video>
                }

                {/* for share video from youtube */}
                {
                    post?.attachments?.data?.[0]?.type === 'share' &&
                    post?.attachments?.data?.[0].media?.source &&
                    <iframe
                        width="100%"
                        height="400"
                        src={post?.attachments?.data?.[0].media?.source}
                        title="YouTube video player"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                }

                {/* for share post from youtube */}
                {
                    post?.attachments?.data?.[0]?.type === 'share' &&
                    !post?.attachments?.data?.[0].media?.source &&
                    post?.attachments?.data?.[0].media?.image?.src &&
                    <p className="text-xl font-bold px-4 py-2">Shared link.</p>
                }

                {/* for share video from facebook */}
                {
                    !post?.message &&
                    !post?.attachments?.data?.[0].media?.image?.src &&
                    !post?.attachments?.data?.[0].media?.source &&
                    <p className="text-xl font-bold px-4 py-2">Shared post.</p>
                }
            </div>
            {
                post?.permalink_url &&
                <div className="px-4 pt-3 text-center">
                    <a
                        href={post?.permalink_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#2d68bb] font-semibold hover:underline"
                    >
                        {'See Original Post'}
                    </a>
                </div>
            }
            <div className="flex justify-between pb-3 px-4">
                <div>
                    <h5 className="text-sm font-semibold">Post Created</h5>
                    <p className="text-[#777] text-xs">{createdTime}</p>
                </div>
                {
                    createdTime !== updatedTime &&
                    <div>
                        <h5 className="text-sm font-semibold text-right">Last Updated</h5>
                        <p className="text-[#777] text-xs">{updatedTime}</p>
                    </div>
                }
            </div>

            {/* <div className="max-h-[700px] overflow-y-auto p-4">
                    {insights.length > 0 ? (
                        insights.map((insight) => (
                            <div key={insight.id} className="mb-4 border-b pb-2">
                                <h3 className="font-semibold text-sm">{insight.title || insight.name}</h3>
                                <p className="text-xs text-gray-600">{insight.description}</p>
                                <p className="text-sm font-semibold mt-1">
                                    Value:{" "}
                                    {typeof insight.values[0]?.value === "object"
                                        ? JSON.stringify(insight.values[0]?.value)
                                        : insight.values[0]?.value}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No insights available.</p>
                    )}
                </div> */}
        </div>
    );
}