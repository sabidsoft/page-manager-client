import { IoMdClose } from 'react-icons/io';
import { CreatePostModalProps } from './types';

export default function CreatePostModal({ isOpen, onClose, children }: CreatePostModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-3xl p-5 rounded-lg relative">
                <IoMdClose
                    onClick={onClose}
                    size={38}
                    className="absolute top-3.5 right-6 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-800"
                />
                <div>{children}</div>
            </div>
        </div>
    );
};
