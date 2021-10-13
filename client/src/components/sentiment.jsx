import { useState } from "react"

export default function Sentiment() {

    const [loading, setLoading] = useState(true);

    if (loading) {

        return (
            <div className="ml-4 border-gray-200 border shadow-md rounded-xl h-full w-full bg-gray-200 bg-opacity-25">
                <div className="w-full bg-blue-200 rounded-t-xl">
                    <h1 className="text-center">Sentiment</h1>

                </div>
                <div className="flex justify-center items-center mt-20">
                    <button className="bg-white rounded-xl p-2 shadow animate-bounce">Loading...</button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="ml-4 border-gray-200 border shadow-md rounded-xl h-full w-full bg-gray-200 bg-opacity-25">
                <div className="w-full bg-blue-200 rounded-t-xl">
                    <h1 className="text-center">Sentiment</h1>

                </div>
            </div>
        )
    }


}