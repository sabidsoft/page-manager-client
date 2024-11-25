import { useEffect, useState } from 'react';
import { usePostToFacebookPageMutation } from '../../redux/features/api/endPoints/facebookPageEndpoint/facebookPageEndpoint';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { PostData } from './types';

export default function CreatePagePost({ facebookPage, setActiveTab }: any) {
    const [errorMessage, setErrorMessage] = useState('');
    const [postToFacebookPage, { data, error, isLoading }] = usePostToFacebookPageMutation();
    const [postData, setPostData] = useState<PostData>({
        message: '',
        link: '',
        mediaType: 'text',
        mediaFile: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPostData((prev) => ({ ...prev, mediaFile: e.target.files?.[0] }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('pageId', facebookPage?.pageId);
        formData.append('pageAccessToken', facebookPage?.pageAccessToken);
        formData.append('message', postData.message);
        formData.append('mediaType', postData.mediaType);

        if (postData.link && postData.mediaType === 'text') {
            formData.append('link', postData.link);
        }

        if ((postData.mediaType === 'photo' || postData.mediaType === 'video') && postData.mediaFile) {
            formData.append('mediaFile', postData.mediaFile);
        }

        postToFacebookPage(formData);
        setErrorMessage('');
    };

    useEffect(() => {
        if (data) {
            setActiveTab('Posts');
            toast.success('Post created successfully!', { position: 'bottom-right', autoClose: 5000 });
        }

        if (error) {
            if ('status' in error) {
                const errMsgJSONString = 'error' in error ? error.error : JSON.stringify(error.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message);
            }
        }
    }, [data, error, setActiveTab]);

    return (
        <>
            {
                isLoading ?
                    <Loader /> :
                    <div className='flex justify-center'>
                        <form onSubmit={handleSubmit} className="bg-[#fff] w-[900px] p-6 rounded-xl shadow">
                            <h2 className='text-center text-3xl pb-6 font-bold'>Create Post</h2>

                            {/* Message Field */}
                            <div className='mb-5'>
                                <label htmlFor="message" className="block font-medium mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={postData.message}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    placeholder="What's on your mind?"
                                />
                            </div>

                            {/* Media Type Selector */}
                            <div className='mb-5'>
                                <label htmlFor="mediaType" className="block font-medium mb-1">Media Type</label>
                                <select
                                    id="mediaType"
                                    name="mediaType"
                                    value={postData.mediaType}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="text">Text</option>
                                    <option value="photo">Photo</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>

                            {/* Link Field - Only for Text Media Type */}
                            {postData.mediaType === 'text' && (
                                <div className='mb-5'>
                                    <label htmlFor="link" className="block font-medium mb-1">Link (If you want to post a link)</label>
                                    <input
                                        type="url"
                                        id="link"
                                        name="link"
                                        value={postData.link}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        placeholder="https://example.com"
                                    />
                                </div>
                            )}

                            {/* File Input - For Photo and Video Types */}
                            {(postData.mediaType === 'photo' || postData.mediaType === 'video') && (
                                <div className='mb-5'>
                                    <label htmlFor="mediaFile" className="block font-medium mb-1">Choose {postData.mediaType}</label>
                                    <input
                                        type="file"
                                        id="mediaFile"
                                        accept={postData.mediaType === 'photo' ? 'image/*' : 'video/*'}
                                        onChange={handleFileChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Submit Post
                            </button>

                            {errorMessage && <p className='text-red-500 mt-4'>{errorMessage}</p>}
                        </form>
                    </div>
            }
        </>
    );
}
