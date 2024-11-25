import { useNavigate } from "react-router-dom";
import defaultProfilePicture from "../../../assets/default_avatar.png";

export default function PageCard({ facebookPage }: any) {
    const navigate = useNavigate();

    const goToFacebookPage = () => {
        navigate(`/pages/${facebookPage?.pageId}`);
    };

    return (
        <div
            onClick={goToFacebookPage}
            className="flex items-center cursor-pointer rounded-lg px-4 py-4 shadow bg-[#fff] transform transition-transform duration-300 hover:scale-105"
        >
            <img
                src={facebookPage?.pageProfilePicture ?? defaultProfilePicture}
                alt="Profile_Picture"
                width={50}
                height={50}
                className="border rounded-lg"
            />
            <div className="ml-4">
                <h3 className="font-bold">{facebookPage?.pageName}</h3>
                <p className="text-gray-500 text-xs font-semibold">{facebookPage?.pageCategory}</p>
            </div>
        </div>
    );
}
