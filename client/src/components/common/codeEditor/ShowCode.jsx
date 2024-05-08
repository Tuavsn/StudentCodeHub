import React, { useState } from "react";
import "./showCodeButton.css"

const ShowCode = ({ code, alt }) => {
    const [copied, setCopied] = useState(false);
    const copyCode = () => {
        var textToCopy = code || alt; // Chuỗi cố định bạn muốn gán vào clipboard
        navigator.clipboard.writeText(textToCopy)
            .then(function () {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            })
            .catch(function (error) {
                console.error('Unable to copy text: ', error);
            });
    }
    return (
        <div className="flex justify-center items-center w-auto">
            <div className="bg-slate-200 text-xs border border-gray-300 rounded pt-3 pb-2 pr-5 relative w-auto">
                {copied || <button className="copy-button absolute top-2 right-2 bg-cyan-500 hover:bg-cyan-600 text-white px-2 py-1 rounded cursor-pointer" onClick={copyCode}><i className="fa-regular fa-copy"></i></button>}
                {copied && <div className="absolute top-2 right-2 bg-cyan-600 text-white px-3 py-1 rounded animate-fadeOutFast">Copied</div>}
                <pre className="mx-8"><code>
                    {code ? code : alt}
                </code></pre>
            </div>
        </div>
    );
}

export default ShowCode;