import React, { useState, useRef } from 'react'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import '../../styles/diary/makediary.css'

function UploadPicture({ sendPhoto, sendText }) {
  const [photo, setPhoto] = useState('')

  const imageInput = useRef()

  const clickUpload = () => {
    imageInput.current.click()
  }

  const upLoadFile = event => {
    if (event.target.files[0]) {
      event.preventDefault()
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onloadend = e => {
        setPhoto(e.target.result)
      }
      const formdata = new FormData()
      formdata.append('file', event.target.files[0])
      sendPhoto(formdata)
    }
  }

  return (
    <div className="upload-picture">
      {photo ? (
        <button
          type="button"
          onClick={() => clickUpload()}
          className="upload-picture-img-btn"
        >
          <img src={photo} alt="사진 업로드" className="upload-picture-img" />
        </button>
      ) : (
        <button
          type="button"
          className="upload-picture-box"
          onClick={() => clickUpload()}
        >
          <PhotoLibraryOutlinedIcon />
        </button>
      )}
      <input
        type="file"
        accpet="img/*"
        onChange={e => upLoadFile(e)}
        style={{ display: 'none' }}
        ref={imageInput}
      />
      <textarea
        className="record-text"
        onChange={e => sendText(e.target.value)}
      />
    </div>
  )
}

export default UploadPicture
