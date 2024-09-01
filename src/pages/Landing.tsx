import React, { useState } from 'react'
import FileUpload from '../components/FileUpload'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'

function Landing() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <div>
        <Navbar />
        {
          loading && <Loading />
        }
        <FileUpload setLoading={setLoading} />
      </div>
    </>
  )
}

export default Landing