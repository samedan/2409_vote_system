import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Voter({ polls }) {
    return (
        // <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div className="min-h-screen bg-gray-100">
            <div>
                <Link href="/">
                    {/* <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" /> */}
                    Voter Layout
                </Link>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
