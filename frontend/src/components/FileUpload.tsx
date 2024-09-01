import React, { useState, ChangeEvent } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import { z } from 'zod';
import instance from '../axios';

const fileUploadSchema = z.object({
    file: z
        .instanceof(File)
        .refine((file) => file.type === 'application/pdf', {
            message: 'Only PDF files are allowed',
        })
        .refine((file) => file.size <= 2 * 1024 * 1024, {
            message: 'File size must be less than or equal to 2MB',
        }),
});

interface fileUploadProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setFileName: React.Dispatch<React.SetStateAction<string | null>>,
    setIsPdfPreview: React.Dispatch<React.SetStateAction<boolean>>
}

const FileUpload = ({ setLoading, setFileName, setIsPdfPreview }: fileUploadProps) => {
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const id = Date.now() + Math.floor(Math.random() * 1000);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        const file = event.target.files?.[0] || null;
        if (file) {
            setSelectedFileName(file.name);
            setSelectedFile(file)

        } else {
            setSelectedFileName(null);
            setSelectedFile(null)
        }
    };

    const handleSubmit = () => {
        setLoading(true)
        if (!selectedFile) {
            setLoading(false)
            setError("Select a pdf file");
            return;
        }

        const file = selectedFile
        const validation = fileUploadSchema.safeParse({ file });

        if (!validation.success) {
            setLoading(false)
            setError(validation.error.errors[0]?.message || 'Invalid file');

            return;
        } else {
            setError(null)
        }
        const formData = new FormData();
        formData.append('file', file);

        instance.post('/api/pdf/extract', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(res.data);
                setFileName(res.data.fileName)
                setLoading(false)
                setIsPdfPreview(true)


            })
            .catch((err) => {
                console.error(err);
                setLoading(false)
            });
    };




    return (
        <div className='text-center h-screen flex flex-col justify-center items-center'>
            <div>
                <h2 className='text-4xl font-semibold mb-10'>Extract PDF Files</h2>
            </div>
            <div className='rounded-3xl md:w-6/12 h-48 bg-[#F0F0F0] flex mb-2'>
                <div className='rounded-lg w-[96%]  h-44 bg-[#F5F5F5] shadow-sm m-auto'>
                    {error && <p className="text-red-500 text-center text-xs mt-2">{error}</p>}

                    <label htmlFor={`dropzone-file${id}`} className="flex items-center justify-center w-full  h-full cursor-pointer">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">

                            <>

                                {
                                    selectedFileName ?
                                        <>
                                            <p className="mb-2 font-semibold text-sm text-indigo-500">{selectedFileName}</p>
                                        </> :
                                        <>
                                            <IoMdCloudUpload size={40} className='text-indigo-500' />
                                            <p className="mb-2 font-semibold text-sm text-indigo-500">Click to Upload PDF</p>
                                        </>
                                }

                                <input
                                    id={`dropzone-file${id}`}
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </>

                        </div>

                    </label>
                </div>
            </div>
            <div>
                <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-5">Extract Pdf</button>
            </div>


        </div>
    );
}

export default FileUpload;
