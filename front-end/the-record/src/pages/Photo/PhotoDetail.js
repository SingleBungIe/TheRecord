/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import PhotoList from '../../components/Album/PhotoList'
import '../../styles/photo/photo-detail.css'

function PhotoDetail() {
  const location = useLocation()
  const navigate = useNavigate()
  const { photoInfo } = location.state
  const [photoDetail, setPhotoDetail] = useState([])
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo)
  const loginUserInfo = useSelector(state => state.common.loginUserInfo)

  useEffect(() => {
    axios
      .get(`https://the-record.co.kr:8080/api/photo/${photoInfo.photoId}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('jwt'),
        },
      })
      .then(res => {
        setPhotoDetail(res.data)
      })
  }, [photoInfo])

  const modifyPhoto = () => {
    navigate('/album/photoedit', {
      state: {
        photoDetail,
      },
    })
  }

  const deletePhoto = () => {
    axios({
      method: 'delete',
      url: `https://the-record.co.kr:8080/api/photo/${photoDetail.photoId}`,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('jwt'),
      },
    }).then(() => {
      navigate('/album')
    })
  }
  return (
    <div id="album" className="photo-detail">
      <div className="bg-white-left">
        <div className="album-photolist">
          <PhotoList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="photo-detail-box">
          <div className="detail-info-box">
            <div className="photo-detail-header">
              <div className="diary-title-box">
                <div className="photo-detail-title">{photoInfo.title}</div>
                <div className="photo-detail-date">
                  {photoInfo.recordDt.replace('-', '.').replace('-', '.')}
                </div>
              </div>
              <div>
                {homePageHostInfo.userPk === loginUserInfo.userPk ? (
                  <>
                    <button
                      className="photo-detail-btn"
                      type="button"
                      onClick={modifyPhoto}
                    >
                      수정
                    </button>
                    <span style={{ color: '#848484' }}>|</span>
                    <button
                      className="photo-detail-btn"
                      type="button"
                      onClick={deletePhoto}
                    >
                      삭제
                    </button>
                  </>
                ) : null}
              </div>
            </div>
            <hr />
            <div className="photo-detail-private">
              {photoDetail.visible === 'PUBLIC' ? (
                <div>전체공개</div>
              ) : (
                <div>나만보기</div>
              )}
            </div>
            <img
              alt="사진첩 상세 이미지"
              src={`https://s3.ap-northeast-2.amazonaws.com/the-record.bucket/${photoDetail.mediaUrl}`}
            />
            <Navigation />
          </div>
        </div>
      </div>
    </div>
  )
}
export default PhotoDetail
