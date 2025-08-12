export default function ApplicationTracker() {
    return (
        <div className="p-8 flex justify-center items-center min-h-screen">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md transition-transform duration-300 hover:scale-105">
                <h1 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
                    Application Tracker
                </h1>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                    Track your job applications and favorites here.
                </p>
            </div>
        </div>
    );
}