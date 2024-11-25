export default function DataDeletionInstructions() {
    return (
        <div className="max-w-4xl mx-auto p-6 text-white">
            <h1 className="text-3xl text-center font-bold mb-6">Data Deletion Instructions</h1>
            <p className="text-sm text-white mb-4"><strong>Last Updated:</strong> 20 Aug, 2024</p>

            <p className="mb-4">At Avatar Management System, we value your privacy and provide you with the ability to delete your personal data from our systems.</p>

            <h2 className="text-2xl font-semibold mb-4">How to Request Data Deletion:</h2>
            <h3 className="text-xl font-semibold mb-2">1. Email Request:</h3>
            <p className="mb-4">Send an email to <a href="mailto:sabidhasanchowdhury@gmail.com" className="text-blue-500">sabidhasanchowdhury@gmail.com</a> with the subject line "Data Deletion Request".</p>
            <p className="mb-4">Include your full name and the email address associated with your account. Our team will process your request within 30 days.</p>

            {/* <h3 className="text-xl font-semibold mb-2">2. In-App Request (If applicable):</h3>
            <p className="mb-4">Log in to your account.</p>
            <p className="mb-4">Navigate to the "Settings" or "Account" section.</p>
            <p className="mb-4">Click on "Delete Account" or "Request Data Deletion" and follow the on-screen instructions to complete the process.</p>

            <h3 className="text-xl font-semibold mb-2">3. Through Our Website:</h3>
            <p className="mb-4">Visit <a href="https://avatar-management-system.netlify.app/" target="_blank" className="text-blue-500" rel="noreferrer">https://avatar-management-system.netlify.app/</a>.</p>
            <p className="mb-4">Go to the "Contact Us" or "Support" section.</p>
            <p className="mb-4">Submit a request through the form provided, specifying "Data Deletion" as the topic.</p> */}

            <h2 className="text-2xl font-semibold mb-4">What Happens Next:</h2>
            <p className="mb-4">Once we receive your request, we will:</p>
            <ul className="list-disc list-inside mb-4">
                <li>Confirm your identity to ensure the request is valid.</li>
                <li>Delete your personal data from our systems, including any backup systems, within 30 days.</li>
                <li>Notify you via email once the deletion is complete.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>If you have any questions about these data deletion instructions, please contact us at <a href="mailto:sabidhasanchowdhury@gmail.com" className="text-blue-500">sabidhasanchowdhury@gmail.com</a>.</p>
        </div>
    );
}
