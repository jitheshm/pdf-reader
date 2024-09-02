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
        </div>
    )
}

export default FilePreview