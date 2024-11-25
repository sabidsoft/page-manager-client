import { IoMdClose } from "react-icons/io";
import { PostInsightsModalProps } from "../components/modal/postInsightsModal/types";

export default function PostInsightsModal({ isOpen, onClose, insights }: PostInsightsModalProps) {
    if (!isOpen) return null;

    // Mapping of Facebook Insights Names to Friendly Labels
    const insightLabels: Record<string, string> = {
        post_impressions: "Post Impressions",
        post_impressions_unique: "Post Reach",
        post_clicks: "Post Clicks",
        post_engaged_users: "Engaged Users",
        post_reactions_like_total: "Total Likes",
        post_reactions_love_total: "Total Loves",
        post_reactions_wow_total: "Total Wows",
        post_reactions_haha_total: "Total Haha",
        post_reactions_sorry_total: "Total Sorry",
        post_reactions_anger_total: "Total Anger",
    };

    return (
        <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg w-[90%] md:w-[600px]">
                <div className="relative flex justify-center border-b">
                    <h2 className="text-2xl font-bold text-center py-4">Post Insights</h2>

                    {/* Close Button */}
                    <IoMdClose
                        onClick={onClose}
                        size={38}
                        className="absolute top-3.5 right-6 bg-gray-100 p-1.5 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-800"
                    />
                </div>

                <div className="max-h-[700px] overflow-y-auto p-4">
                    {insights.length > 0 ? (
                        insights.map((insight) => {
                            const label = insightLabels[insight.name] || insight.title || insight.name;
                            const value =
                                typeof insight.values[0]?.value === "object"
                                    ? JSON.stringify(insight.values[0]?.value)
                                    : insight.values[0]?.value;

                            return (
                                <div key={insight.id} className="mb-4 border-b pb-2">
                                    <h3 className="font-semibold text-sm">{label}</h3>
                                    <p className="text-xs text-gray-600">{insight.description}</p>
                                    <p className="text-sm font-semibold mt-1">Value: {value}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p>No insights available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
