import { useParams } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { useGetFacebookPageQuery } from "../../redux/features/api/endPoints/facebookPageEndpoint/facebookPageEndpoint";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import Posts from "../../components/posts/Posts";
import CreatePagePost from "../../components/createPagePost/CreatePagePost";
import Insights from "../../components/insights/Insights";
import About from "../../components/about/About";
import defaultProfilePicture from "../../assets/default_avatar.png";

export default function Page() {
    const { pageId } = useParams();
    const { data, isError, isLoading } = useGetFacebookPageQuery(pageId as string);
    const [activeTab, setActiveTab] = useState("Posts");

    const facebookPage = data?.data?.facebookPage;

    let content;

    if (isLoading) content = <Loader />;

    if (!isLoading && isError) content = <ErrorMessage message="Something went wrong." />;

    if (!isLoading && !isError && facebookPage) {
        if (activeTab === "Posts")
            content = <Posts facebookPage={facebookPage} />;

        else if (activeTab === "About")
            content = <About facebookPage={facebookPage} />;

        else if (activeTab === "Insights")
            content = <Insights facebookPage={facebookPage} />;

        else if (activeTab === "Create Post")
            content = <CreatePagePost facebookPage={facebookPage} setActiveTab={setActiveTab} />;
    }

    return (
        <div className="flex h-screen">
            <Sidebar activeMenu="All Pages" />

            <main className="w-[77%] overflow-y-auto">
                <div className="bg-[#fff] flex justify-center pt-5">
                    <div className="flex items-center">
                        <img
                            src={facebookPage?.pageProfilePicture ?? defaultProfilePicture}
                            alt="Profile_Picture"
                            width={50}
                            height={50}
                            className="border-2 border-gray-200 p-0.5 rounded-full"
                        />
                        <h3 className="text-2xl font-bold ml-2">{facebookPage?.pageName}</h3>
                    </div>
                </div>

                {/* Sticky Tabs */}
                <div className="bg-[#fff] sticky top-0 z-10 pt-4 shadow">
                    <div className="flex justify-center w-[700px] mx-auto space-x-6">
                        {["Posts", "About", "Insights", "Create Post"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative pb-3 px-4 text-lg font-medium transition-colors duration-300 
                            ${activeTab === tab ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-600 rounded-t-md"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Render Content Based on Active Tab */}
                <div className="px-4 py-16">
                    {content}
                </div>
            </main>
        </div>
    );
}
