import React, { useState } from 'react'
import FileUpload from '../components/FileUpload'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'

function Landing() {
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isPdfPreview, setIsPdfPreview] = useState(false)
  return (
    <>
      <div>
        <Navbar />
        {
          loading && <Loading />
        }
        {
          !isPdfPreview && <FileUpload setLoading={setLoading} setFileName={setFileName} setIsPdfPreview={setIsPdfPreview} />
        }

      </div>
    </>
  )
}

export default Landing