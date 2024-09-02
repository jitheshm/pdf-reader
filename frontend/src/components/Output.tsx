import React from 'react'
import { FaArrowDown } from "react-icons/fa";

function Output({ outputFile }: { outputFile: string | null }) {

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = outputFile!;
        a.download = 'extract-pdf.pdf'; // File name
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(outputFile!);
    }
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <button type="button" onClick={handleDownload} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Download New PDF
                <FaArrowDown />
            </button>

        </div>
    )
}

export default Output