import { useState } from "react"
import Loading from "./loading";
export default function Sentiment() {

    const [loading, setLoading] = useState(true);

    if (loading) {

        return (
            <div className="ml-4 border-gray-200 border shadow-md rounded-xl h-full w-full bg-gray-200 bg-opacity-25">
                <div className="w-full bg-blue-200 rounded-t-xl">
                    <h1 className="text-center">Sentiment</h1>

                </div>
                <Loading />
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