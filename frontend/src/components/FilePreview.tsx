import React, { useEffect, useState } from 'react'
import instance from '../axios'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";




interface FilePreviewProps {
    fileName: string
}
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

function FilePreview({ fileName }: FilePreviewProps) {
    const [file, setFile] = useState<string | null>(null)
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>();
    const [selectedPages, setSelectedPages] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        instance.get(`/api/pdf/pdfname/${fileName}`, { responseType: 'blob' }).then((response) => {
            const url = URL.createObjectURL(response.data);
            setFile(url)
            console.log(url);

        }).catch((err) => {
            console.log(err);

        })
    }, [])

    const onLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleNext = () => {
        setPageNumber((prev) => {
            if (prev < numPages!)
                return prev + 1
            else
                return prev
        })
    }

    const handlePrev = () => {
        setPageNumber((prev) => {
            if (prev > 1)
                return prev - 1
            else
                return prev
        })
    }

    const handleCheckboxChange = () => {
        if (selectedPages.includes(pageNumber)) {
            setSelectedPages((prev) => {
                return (
                    prev.filter((ele) => {
                        return ele != pageNumber
                    })
                )
            })
        }
        else {
            setSelectedPages((prev) => {
                return [...prev, pageNumber]
            })
        }
    }

    const handleSubmit = () => {
        if (selectedPages.length > 0) {
            setError(null)
            console.log(selectedPages);

        } else {
            setError('Select atleast 1 page')
        }
    }

    return (
        <div>
            <p className='mt-5 text-center text-2xl font-bold'>PDF preview</p>
            <div className={'mx-auto w-fit border border-gray-300 my-5'}>
                <nav className='flex justify-center items-center'>
                    <div>
                        {
                            pageNumber > 1 &&
                            <button type="button" className="text-gray-900 hover:text-blue-600  border-gray-800   focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  " onClick={handlePrev}><FaAngleLeft /></button>

                        }
                        {
                            pageNumber < numPages! &&
                            <button type="button" className="text-gray-900 hover:text-blue-600  border-gray-800   focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  " onClick={handleNext}><FaChevronRight /></button>


                        }
                    </div>

                </nav>

                <div >
                    <div className='mx-2 flex gap-4 items-center'>
                        <input id="link-checkbox" type="checkbox" checked={selectedPages.includes(pageNumber)} onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <div>
                            {
                                selectedPages.includes(pageNumber) && selectedPages.indexOf(pageNumber) + 1
                            }
                        </div>
                    </div>
                    <Document
                        file={file}
                        onLoadSuccess={onLoadSuccess}
                        className={'mx-auto w-fit'}

                    >
                        <Page className='mx-auto' pageNumber={pageNumber} height={400} renderAnnotationLayer={false} />
                    </Document>
                </div>

                <p className='text-center'>
                    Page {pageNumber} of {numPages}
                </p>
            </div>
            <div className='text-center my-2'>
                <div className='my-2'>
                    {
                        error && <p className='text-red-700'>{error}</p>
                    }
                </div>
                <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Extract and Create New Pdf</button>
            </div>
        </div>
    )
}

export default FilePreview