import React from 'react'
import { useNavigate } from 'react-router'

function MakeDiaryButton({ clickUpload, clickCancel }) {
  const navigate = useNavigate()

  const moveDiaryMain = () => {
    navigate('/diary')
  }
  return (
    <div className="make-diary-button">
      <button
        className="make-diary-cancel"
        type="button"
        onClick={() => [moveDiaryMain(), clickCancel()]}
      >
        취소
      </button>
      <button
        className="make-diary-upload"
        type="button"
        onClick={() => clickUpload()}
      >
        업로드
      </button>
    </div>
  )
}

export default MakeDiaryButton
