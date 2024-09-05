import { useEffect, useState } from 'react'
import FileUpload from '../components/FileUpload'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import FilePreview from '../components/FilePreview'
import Output from '../components/Output'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

function Landing() {
  const [loading, setLoading] = useState(true)
  const [fileName, setFileName] = useState<string | null>(null)
  const [outputFile, setOutputFile] = useState<string | null>(null)
  const [isPdfPreview, setIsPdfPreview] = useState(false)
  const { status } = useSelector((state: RootState) => state.user);


  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      setLoading(false);
    } else {
      navigate('/login')
    }
  }, [status, navigate]);
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
        {
          isPdfPreview && fileName && !outputFile && <FilePreview fileName={fileName} setOutputFile={setOutputFile} setLoading={setLoading} />
        }
        {
          outputFile && <Output outputFile={outputFile} />
        }

      </div>
    </>
  )
}

export default Landing