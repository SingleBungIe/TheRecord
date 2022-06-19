/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import FaceIcon from '@mui/icons-material/Face'
import axios from 'axios'
import EditButton from '../../assets/edit_button.png'
import '../../styles/home/edit-profile.css'
import callApi from '../../common/api'
import store from '../../store'
import { types } from '../../actions/common'

function EditProfile() {
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo)
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false)
  const [tempImg, setTempImg] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [profileText, setProfileText] = useState(homePageHostInfo.introduce)

  const handleText = e => {
    setProfileText(e.currentTarget.value)
  }

  const fileInput = useRef()

  const handleProfileImg = e => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0])
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setTempImg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const updateProfile = async () => {
    if (imageFile !== null) {
      const formData = new FormData()
      formData.append('profile', imageFile)
      await axios
        .put(`https://the-record.co.kr:8080/api/user/profile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': sessionStorage.getItem('jwt'),
          },
        })
        .catch(() => {
          alert('사진 용량을 초과하였습니다')
        })
    }

    if (profileText !== homePageHostInfo.introduce) {
      await callApi({
        method: 'put',
        url: `/api/user/introduction`,
        data: { introduce: profileText },
      })
    }

    store.dispatch({
      type: types.FETCH_USER_INFO,
      userInfo: homePageHostInfo,
      key: 'homePageHostInfo',
    })
    store.dispatch({
      type: types.FETCH_USER_INFO,
      userInfo: homePageHostInfo,
      key: 'loginUserInfo',
    })

    setEditProfileDialogOpen(false)
  }

  const handleClose = () => {
    setTempImg(() => null)
    setProfileText(() => homePageHostInfo.introduce)
    setEditProfileDialogOpen(false)
  }

  return (
    <div id="edit-profile">
      <button
        className="header-right-button"
        type="button"
        onClick={() => {
          setEditProfileDialogOpen(true)
        }}
      >
        프로필 수정하기
      </button>

      <div>
        <Dialog
          open={editProfileDialogOpen}
          onClose={() => handleClose()}
          id="dialog"
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
              <FaceIcon sx={{ fontSize: 26 }} />
              <p>프로필 수정</p>
            </div>

            <Button
              sx={{
                minWidth: 36,
                height: 49,
              }}
              onClick={() => handleClose()}
            >
              <CloseRoundedIcon
                sx={{
                  fontSize: 29,
                }}
              />
            </Button>
          </DialogTitle>

          <div className="dialog-body-box">
            <div className="dialog-body edit-profile-dialog-body">
              <div className="edit-profile-img">
                {tempImg === null ? (
                  <img
                    src={`https://s3.ap-northeast-2.amazonaws.com/the-record.bucket/${homePageHostInfo.profile}`}
                    alt="myProfile"
                  />
                ) : (
                  <img src={tempImg} alt="변경" />
                )}
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept="image/jpg,impge/png,image/jpeg"
                  name="profile_img"
                  onChange={e => handleProfileImg(e)}
                  ref={fileInput}
                />
                <div className="profileImg-edit-button">
                  <button
                    type="button"
                    onClick={() => {
                      fileInput.current.click()
                    }}
                  >
                    <img src={EditButton} alt="수정버튼" />
                    <p>EDIT</p>
                  </button>
                </div>
              </div>
              <textarea value={profileText} onChange={e => handleText(e)} />
              <button
                className="edit-done-button"
                type="submit"
                onClick={() => updateProfile()}
              >
                수정 완료
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  )
}

export default EditProfile
