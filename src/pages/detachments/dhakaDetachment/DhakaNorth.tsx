import { useState } from "react";
import useTitle from "../../../hooks/useTitle";
import { useGetFacebookPagesQuery } from "../../../redux/features/api/endPoints/facebookPageEndpoint/facebookPageEndpoint";
import Loader from "../../../components/loader/Loader";
import ErrorMessage from "../../../components/errorMessage/ErrorMessage";
import PageCard from "../../../components/cards/pageCard/PageCard";
import Sidebar from "../../../components/sidebar/Sidebar";
import CreatePostModal from "../../../components/modal/createPostModal/CreatePostModal";
import CreatePagesPost from "../../../components/createPagesPost/CreatePagesPost";
import FacebookPageLogin from "../../../components/facebookPageLogin/FacebookPageLogin";

export default function DhakaNorth() {
    useTitle('Dhaka North');
    const { data, isError, isLoading } = useGetFacebookPagesQuery({ fieldName: 'districtName', fieldValue: 'Dhaka North' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const facebookPages = data?.data.facebookPages;

    let content;

    if (isLoading) content = <Loader />;

    if (!isLoading && isError) content = <ErrorMessage message="Something went wrong." />;

    if (!isLoading && !isError && facebookPages && facebookPages.length === 0)
        content = <ErrorMessage message='Oops! There are no Facebook page available!' />;

    if (!isLoading && !isError && facebookPages && facebookPages.length > 0)
        content = (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 rounded-xl">
                {facebookPages.map((facebookPage: any) => (
                    <PageCard key={facebookPage._id} facebookPage={facebookPage} />
                ))}
            </div>
        );

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar activeMenu='Dhaka North' />

            {/* Main Content */}
            <main className="w-[77%] overflow-y-auto">
                <div className="flex justify-between items-center px-6 py-6 shadow">
                    <h2 className='text-center text-3xl font-bold'>Pages of Dhaka North</h2>
                    <div className="flex items-start">
                        <button
                            onClick={handleOpenModal}
                            className='bg-blue-600 text-white py-1 px-4 mr-5 rounded-lg hover:bg-blue-700 focus:outline-none'
                        >
                            Create Post to All Pages
                        </button>

                        <FacebookPageLogin
                            detachmentName="Dhaka Detachment"
                            districtName="Dhaka North"
                            navigateTo="/dhaka-detachment/dhaka-north"
                        />
                    </div>
                </div>

                <div className="px-16 py-10">
                    {content}
                </div>
            </main>

            {/* Modal for Create Post */}
            <CreatePostModal isOpen={isModalOpen} onClose={handleCloseModal}>
                <CreatePagesPost
                    fieldName="districtName"
                    fieldValue="Dhaka North"
                    onClose={handleCloseModal}
                />
            </CreatePostModal>
        </div>
    );
}
