import React from "react";

export const NotFoundPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">404 - Page Not Found</h2>
                <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p>
            </div>
        </div>
    );
};
