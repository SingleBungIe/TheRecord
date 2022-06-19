import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Navigation from '../../components/Navigation'
import PhotoList from '../../components/Album/PhotoList'
import '../../styles/photo/photo-upload.css'

function PhotoDecoUpload() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [photoDto, setPhotoDto] = useState({
    title: '',
    visible: 'PUBLIC',
  })
  const [checked, setChecked] = useState(true)

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? '#177ddc'
              : 'rgba(29, 142, 174, 0.87)',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,.35)'
          : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }))

  const handleChange = event => {
    setChecked(event.target.checked)
  }

  useEffect(() => {
    if (checked) {
      setPhotoDto(prev => ({ ...prev, visible: 'PUBLIC' }))
    } else {
      setPhotoDto(prev => ({ ...prev, visible: 'PRIVATE' }))
    }
  }, [checked])

  useEffect(() => {
    if (photoDto.visible === 'PRIVATE') {
      setPhotoDto(prev => ({ ...prev, visible: 'PRIVATE' }))
    }
  }, [photoDto.visible])

  const onChangTitle = e => {
    setPhotoDto(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const saveDecoPhoto = () => {
    const blobBin = atob(state.split(',')[1])
    const array = []
    for (let i = 0; i < blobBin.length; i += 1) {
      array.push(blobBin.charCodeAt(i))
    }

    const file = new File([new Uint8Array(array)], 'blobtofile.png', {
      type: 'image/png',
    })

    const formData = new FormData()
    formData.append('file', file)
    formData.append(
      'photoDto',
      new Blob([JSON.stringify(photoDto)], { type: 'application/json' }),
    )

    axios({
      method: 'post',
      url: 'https://the-record.co.kr:8080/api/photo',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': sessionStorage.getItem('jwt'),
      },
    })
      .then(() => {
        navigate('/album')
      })
      .catch(() => {
        alert('문제가 발생했습니다.')
      })
  }

  return (
    <div id="album" className="photo-upload">
      <div className="bg-white-left">
        <div className="album-photolist">
          <PhotoList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="photo-upload-box">
          <div className="upload-info-box">
            <div className="photo-upload-header">
              <input
                placeholder="제목을 입력해주세요"
                id="title"
                onChange={onChangTitle}
                maxLength="20"
              />
              <div className="private-btn">
                <p>나만 보기</p>
                <AntSwitch
                  checked={checked}
                  onChange={event => handleChange(event)}
                  inputProps={{ 'aria-label': 'ant design' }}
                />
              </div>
            </div>
            <div className="photo-upload-img">
              <img alt="DecoImg" src={state} />
            </div>
          </div>
          <button
            type="button"
            className="photo-upload-btn"
            onClick={saveDecoPhoto}
          >
            사진첩에 저장하기
          </button>
          <Navigation />
        </div>
      </div>
    </div>
  )
}

export default PhotoDecoUpload
