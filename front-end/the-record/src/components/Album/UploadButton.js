import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/photo/album.css'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'

function UploadButton() {
  const navigate = useNavigate()
  const movePhothDeco = () => {
    navigate('/album/photodeco')
  }

  return (
    <div>
      <button
        type="button"
        className="album-btn"
        onClick={() => movePhothDeco()}
      >
        <CloudUploadOutlinedIcon className="album-btn-icon" fontSize="small" />
        업로드 하기
      </button>
    </div>
  )
}

export default UploadButton
