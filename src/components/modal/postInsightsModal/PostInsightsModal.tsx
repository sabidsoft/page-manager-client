import { PostInsightsModalProps } from "./types";
import { IoMdClose, IoIosHeart } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import hahaReact from "../../../assets/reactions/haha.png";
import wowReact from "../../../assets/reactions/wow.png";
import sorryReact from "../../../assets/reactions/sorry.png";
import angerReact from "../../../assets/reactions/anger.png";

export default function PostInsightsModal({
    isOpen,
    onClose,
    insights,
}: PostInsightsModalProps) {
    if (!isOpen) return null;

    // Extract post_impressions insights with lifetime values
    const postImpressions = insights.find((item) => item.name === "post_impressions" && item.period === "lifetime")?.values[0]?.value ?? 0;

    // Extract post_impressions_unique insights with lifetime values
    const postReach = insights.find((item) => item.name === "post_impressions_unique" && item.period === "lifetime")?.values[0]?.value ?? 0;

    // Extract post_clicks insights with lifetime values
    const postClicks = insights.find((item) => item.name === "post_clicks" && item.period === "lifetime")?.values[0]?.value ?? 0;

    // Extract reactions by type using lifetime values
    const postReactionsByType = insights.find((item) => item.name === "post_reactions_by_type_total" && item.period === "lifetime");

    // Default values for each reaction type
    const reactionCounts = {
        like: 0,
        love: 0,
        haha: 0,
        wow: 0,
        sorry: 0,
        anger: 0,
    };

    // Extract and assign values from postReactionsByType
    if (postReactionsByType && postReactionsByType.values[0]?.value) {
        const reactions = postReactionsByType.values[0].value;
        reactionCounts.like = reactions.like || 0;
        reactionCounts.love = reactions.love || 0;
        reactionCounts.haha = reactions.haha || 0;
        reactionCounts.wow = reactions.wow || 0;
        reactionCounts.sorry = reactions.sorry || 0;
        reactionCounts.anger = reactions.anger || 0;
    }

    return (
        <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg w-[90%] md:w-[600px]">
                <div className="relative flex justify-center border-b">
                    <h2 className="text-2xl font-bold text-center py-4">Post Insights</h2>
                    {/* Close Button */}
                    <IoMdClose
                        onClick={onClose}
                        size={38}
                        className="absolute top-3.5 right-6 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-800"
                    />
                </div>

                <div className="max-h-[700px] overflow-y-auto px-3 py-5 mb-6">
                    {/* Post impressions, reach, and clicks */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-[#F0F2F5] p-3 rounded-lg">
                            <h3 className="text-sm">Post Impressions</h3>
                            <p className="text-2xl font-bold my-2">{postImpressions}</p>
                        </div>
                        <div className="bg-[#F0F2F5] p-3 rounded-lg">
                            <h3 className="text-sm">Post Reach</h3>
                            <p className="text-2xl font-bold my-2">{postReach}</p>
                        </div>
                        <div className="bg-[#F0F2F5] p-3 rounded-lg">
                            <h3 className="text-sm">Post Clicks</h3>
                            <p className="text-2xl font-bold my-2">{postClicks}</p>
                        </div>
                    </div>
                </div>

                {/* Interactions */}
                <div className="px-6 mb-16">
                    <h3 className="text-xl font-semibold mb-5">Interactions</h3>
                    <div className="flex justify-between mx-12">
                        {/* Like */}
                        <div className="flex flex-col items-center">
                            <AiFillLike
                                size={24}
                                color="#fff"
                                className="bg-[#057FFD] p-1 rounded-full mb-2"
                            />
                            <span className="text-sm">{reactionCounts.like}</span>
                        </div>

                        {/* Love */}
                        <div className="flex flex-col items-center">
                            <IoIosHeart
                                size={24}
                                color="#fff"
                                className="bg-[#FB4B6B] p-1 rounded-full mb-2"
                            />
                            <span className="text-sm">{reactionCounts.love}</span>
                        </div>

                        {/* Haha */}
                        <div className="flex flex-col items-center">
                            <img
                                src={hahaReact}
                                alt="Haha React"
                                width={24}
                                height={24}
                                className="mb-2"
                            />
                            <span className="text-sm">{reactionCounts.haha}</span>
                        </div>

                        {/* Wow */}
                        <div className="flex flex-col items-center">
                            <img
                                src={wowReact}
                                alt="Wow React"
                                width={24}
                                height={24}
                                className="mb-2"
                            />
                            <span className="text-sm">{reactionCounts.wow}</span>
                        </div>

                        {/* Sorry */}
                        <div className="flex flex-col items-center">
                            <img
                                src={sorryReact}
                                alt="Sad React"
                                width={24}
                                height={24}
                                className="mb-2"
                            />
                            <span className="text-sm">{reactionCounts.sorry}</span>
                        </div>

                        {/* Anger */}
                        <div className="flex flex-col items-center">
                            <img
                                src={angerReact}
                                alt="Anger React"
                                width={24}
                                height={24}
                                className="mb-2"
                            />
                            <span className="text-sm">{reactionCounts.anger}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
