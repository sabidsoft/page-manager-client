import { useGetFacebookPageAboutQuery } from "../../redux/features/api/endPoints/facebookPageEndpoint/facebookPageEndpoint";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";
import defaultProfilePicture from "../../assets/default_avatar.png";

export default function About({ facebookPage }: any) {
    const { data, isError, isLoading } = useGetFacebookPageAboutQuery(facebookPage?.pageId as string);

    const pageInfo = data?.data?.pageInfo;

    if (isLoading) return <Loader />;
    if (isError) return <ErrorMessage message="Something went wrong." />;
    if (!pageInfo) return <ErrorMessage message="Oops! Sorry! There is no page info available!" />;

    const {
        picture,
        name,
        category,
        fan_count,
        followers_count,
        is_published,
        is_verified,
        website,
        link,
        about,
    } = pageInfo;

    return (
        <div className="flex justify-center">
            <div className="bg-white w-full max-w-[800px] p-6 rounded-lg shadow">
                {/* Profile Section */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <img
                            src={picture?.data?.url ?? defaultProfilePicture}
                            alt="Profile_picture"
                            width={70}
                            height={70}
                            className="border-2 border-gray-200 p-0.5 rounded-full"
                        />
                        <div className="ml-4">
                            <h2 className="text-lg font-semibold">{name}</h2>
                            <p className="text-gray-500 text-xs font-semibold">{category}</p>
                        </div>
                    </div>
                    <h2 className="text-sm text-gray-800 font-semibold">
                        {`${fan_count ?? 0} Likes · ${followers_count ?? 0} Followers`}
                    </h2>
                </div>

                {/* About Section */}
                {about && (
                    <p className="w-[50%] mx-auto text-sm text-center text-gray-500 italic mb-10">
                        &#x275D; {about} &#x275E;
                    </p>
                )}

                {/* Information List */}
                <div className="flex justify-between border-b border-t pt-3 pb-3 mb-3">
                    <p className="font-medium">Name</p>
                    <p>{name ?? "N/A"}</p>
                </div>

                <div className="flex justify-between border-b pb-3 mb-3">
                    <p className="font-medium">Category</p>
                    <p>{category ?? "N/A"}</p>
                </div>

                <div className="flex justify-between border-b pb-3 mb-3">
                    <p className="font-medium">Likes</p>
                    <p>{fan_count ?? 0}</p>
                </div>

                <div className="flex justify-between border-b pb-3 mb-3">
                    <p className="font-medium">Followers</p>
                    <p>{followers_count ?? 0}</p>
                </div>

                <div className="flex justify-between border-b pb-3 mb-3">
                    <p className="font-medium">Published</p>
                    <p>{is_published ? "Yes" : "No"}</p>
                </div>

                <div className="flex justify-between border-b pb-3 mb-3">
                    <p className="font-medium">Verified</p>
                    <p>{is_verified ? "Yes" : "No"}</p>
                </div>

                {/* Website Link (if available) */}
                {website && (
                    <div className="flex justify-between border-b pb-3 mb-3">
                        <p className="font-medium">Website</p>
                        <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Visit Website
                        </a>
                    </div>
                )}

                {/* Facebook Page Link */}
                {link && (
                    <div className="flex justify-between border-b pb-3">
                        <p className="font-medium">Page Profile</p>
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            View Facebook Page
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

// // With map
// import { useGetFacebookPageAboutQuery } from "../../redux/features/api/endPoints/facebookPageEndpoint/facebookPageEndpoint";
// import ErrorMessage from "../errorMessage/ErrorMessage";
// import Loader from "../loader/Loader";
// import defaultProfilePicture from "../../assets/default_avatar.png";

// export default function About({ facebookPage }: any) {
//     const { data, isError, isLoading } = useGetFacebookPageAboutQuery(facebookPage?.pageId as string);

//     const pageInfo = data?.data?.pageInfo;

//     if (isLoading) return <Loader />;
//     if (isError) return <ErrorMessage message="Something went wrong." />;
//     if (!pageInfo) return <ErrorMessage message="Oops! Sorry! There is no page info available!" />;

//     const {
//         picture,
//         name,
//         category,
//         fan_count,
//         followers_count,
//         is_published,
//         is_verified,
//         website,
//         link,
//         about,
//         location,
//     } = pageInfo;

//     // Extract latitude and longitude from location
//     const latitude = location?.latitude;
//     const longitude = location?.longitude;

//     return (
//         <div className="flex justify-center">
//             <div className="bg-white w-full max-w-[800px] p-6 rounded-lg shadow">
//                 {/* Profile Section */}
//                 <div className="flex justify-between items-center mb-6">
//                     <div className="flex items-center">
//                         <img
//                             src={picture?.data?.url ?? defaultProfilePicture}
//                             alt="Profile_picture"
//                             width={70}
//                             height={70}
//                             className="border-2 border-gray-200 p-0.5 rounded-full"
//                         />
//                         <div className="ml-2">
//                             <h2 className="text-lg font-semibold">{name}</h2>
//                             <p className="text-gray-500 text-xs font-semibold">{category}</p>
//                         </div>
//                     </div>
//                     <h2 className="text-sm text-gray-800 font-semibold">
//                         {`${fan_count ?? 0} Likes · ${followers_count ?? 0} Followers`}
//                     </h2>
//                 </div>

//                 {/* About Section */}
//                 {about && (
//                     <p className="w-[50%] mx-auto text-sm text-center text-gray-500 italic mb-10">
//                         &#x275D; {about} &#x275E;
//                     </p>
//                 )}

//                 {/* Information List */}
//                 <div className="flex justify-between border-b border-t pt-3 pb-3 mb-3">
//                     <p className="font-medium">Name</p>
//                     <p>{name ?? "N/A"}</p>
//                 </div>

//                 <div className="flex justify-between border-b pb-3 mb-3">
//                     <p className="font-medium">Category</p>
//                     <p>{category ?? "N/A"}</p>
//                 </div>

//                 <div className="flex justify-between border-b pb-3 mb-3">
//                     <p className="font-medium">Likes</p>
//                     <p>{fan_count ?? 0}</p>
//                 </div>

//                 <div className="flex justify-between border-b pb-3 mb-3">
//                     <p className="font-medium">Followers</p>
//                     <p>{followers_count ?? 0}</p>
//                 </div>

//                 <div className="flex justify-between border-b pb-3 mb-3">
//                     <p className="font-medium">Published</p>
//                     <p>{is_published ? "Yes" : "No"}</p>
//                 </div>

//                 <div className="flex justify-between border-b pb-3 mb-3">
//                     <p className="font-medium">Verified</p>
//                     <p>{is_verified ? "Yes" : "No"}</p>
//                 </div>

//                 {/* Website Link (if available) */}
//                 {website && (
//                     <div className="flex justify-between border-b pb-3 mb-3">
//                         <p className="font-medium">Website</p>
//                         <a
//                             href={website}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 font-semibold hover:underline"
//                         >
//                             Visit Website
//                         </a>
//                     </div>
//                 )}

//                 {/* Facebook Page Link */}
//                 {link && (
//                     <div className="flex justify-between border-b pb-3 mb-3">
//                         <p className="font-medium">Page Profile</p>
//                         <a
//                             href={link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 font-semibold hover:underline"
//                         >
//                             View Facebook Page
//                         </a>
//                     </div>
//                 )}

//                 {/* Map Section */}
//                 {latitude && longitude && (
//                     <div className="mt-6">
//                         <h3 className="text-center text-lg font-semibold mb-2">Location</h3>
//                         <iframe
//                             title="Location Map"
//                             width="100%"
//                             height="300"
//                             style={{ border: "0" }}
//                             loading="lazy"
//                             allowFullScreen
//                             src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${latitude},${longitude}&zoom=14&maptype=satellite`}
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
