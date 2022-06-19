import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Navigation from '../../components/Navigation'
import DiaryList from '../../components/Diary/DiaryList'
import DiaryDetailContainer from '../../components/Diary/DiaryDetailContainer'
import '../../styles/diary/diarydetail.css'

function DiaryDetail() {
  const navigate = useNavigate()
  const diaryId = useLocation().state
  const [openDialog, setOpenDialog] = useState(false)
  const [diaryInfo, setDiaryInfo] = useState([])
  const loginUserInfo = useSelector(state => state.common.loginUserInfo)
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo)

  useEffect(() => {
    axios
      .get(`https://the-record.co.kr/api/diary/${diaryId}`, {
        headers: {
          'x-auth-token': sessionStorage.getItem('jwt'),
        },
      })
      .then(res => {
        setDiaryInfo(res.data)
      })
  }, [diaryId])

  const openSelectDialog = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const moveMakeDiary = category => {
    navigate('/diary/makediary', { state: category })
  }

  return (
    <div id="diarydetail">
      <div className="bg-white-left">
        <div className="diary-diarylist">
          <DiaryList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="diarydetail-box">
          <div className="diarydetail-header">
            {loginUserInfo.userPk === homePageHostInfo.userPk ? (
              <button
                type="button"
                className="make-diary-btn"
                onClick={() => {
                  openSelectDialog()
                }}
              >
                일기 작성하기
              </button>
            ) : (
              ''
            )}
          </div>
          <DiaryDetailContainer diaryInfo={diaryInfo} />
        </div>
        <Navigation />
      </div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        id="dialog"
        className="diary-dialog"
        aria-labelledby="dialog-container"
        aria-describedby="dialog-description"
        PaperProps={{
          sx: {
            minWidth: 800,
            borderRadius: 2.7,
          },
        }}
      >
        <DialogTitle id="dialog-container" className="dialog-header">
          <div className="dialog-title">
            <p>카테고리 선택</p>
          </div>
          <Button
            sx={{
              minWidth: 36,
              height: 49,
            }}
            onClick={() => {
              handleClose()
            }}
          >
            <CloseRoundedIcon
              sx={{
                fontSize: 29,
              }}
            />
          </Button>
        </DialogTitle>
        <div className="dialog-body-box">
          <div className="diary-dialog-body">
            <button
              type="button"
              className="diary-dialog-btns"
              onClick={() => {
                moveMakeDiary('PICTURE')
              }}
            >
              <img
                src={require('../../assets/picture.png')}
                alt="uploadPicture"
                className="diary-dialog-img"
              />
              <div>사진 & 글로 남기기</div>
            </button>
            <button
              type="button"
              className="diary-dialog-btns"
              onClick={() => {
                moveMakeDiary('VIDEO')
              }}
            >
              <img
                src={require('../../assets/recording.png')}
                alt="uploadPicture"
                className="diary-dialog-img"
              />
              <div>영상으로 남기기</div>
            </button>
            <button
              type="button"
              className="diary-dialog-btns"
              onClick={() => {
                moveMakeDiary('VOICE')
              }}
            >
              <img
                src={require('../../assets/voice.png')}
                alt="uploadPicture"
                className="diary-dialog-img"
              />
              <div>목소리로 남기기</div>
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default DiaryDetail
