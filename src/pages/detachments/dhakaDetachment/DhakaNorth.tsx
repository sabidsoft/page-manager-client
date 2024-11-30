import { useState } from "react";
import useTitle from "../../../hooks/useTitle";
import { useGetFacebookPagesQuery } from "../../../redux/features/api/endPoints/facebookPageEndpoint/facebookPageEndpoint";
import Loader from "../../../components/loader/Loader";
import ErrorMessage from "../../../components/errorMessage/ErrorMessage";
import PageCard from "../../../components/cards/pageCard/PageCard";
import Sidebar from "../../../components/sidebar/Sidebar";
import CreatePagesPostModal from "../../../components/modal/createPagesPostModal/CreatePagesPostModal";
import CreatePagesPost from "../../../components/createPagesPost/CreatePagesPost";

export default function DhakaNorth() {
    useTitle('Dhaka North');
    const { data, isError, isLoading } = useGetFacebookPagesQuery('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const facebookPages = data?.data.facebookPages;

    let content;

    if (isLoading) content = <Loader />;

    if (!isLoading && isError) content = <ErrorMessage message="Something went wrong." />;

    if (!isLoading && !isError && facebookPages && facebookPages.length === 0)
        content = <ErrorMessage message='Oops! Sorry! There is no Facebook page available!' />;

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
            <main className="w-[77%] px-5 overflow-y-auto">
                <h2 className='text-center text-3xl py-6 mb-4 font-bold border-b'>Pages of Dhaka North</h2>
                <div className='flex justify-end items-center mb-6'>
                    <button
                        onClick={handleOpenModal}
                        className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none'
                    >
                        Create Post to All Pages
                    </button>
                </div>
                {content}
            </main>

            {/* Modal for Create Post */}
            <CreatePagesPostModal isOpen={isModalOpen} onClose={handleCloseModal}>
                <CreatePagesPost onClose={handleCloseModal} />
            </CreatePagesPostModal>
        </div>
    );
}
