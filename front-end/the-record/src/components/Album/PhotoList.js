import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/photo/album.css'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PhotoList() {
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo)
  const [photolist, setPhotolist] = useState([])

  useEffect(() => {
    axios
      .get(
        `https://the-record.co.kr:8080/api/photo/list/${homePageHostInfo.userPk}`,
        {
          headers: {
            'x-auth-token': sessionStorage.getItem('jwt'),
          },
        },
      )
      .then(res => {
        setPhotolist(res.data)
      })
  }, [])

  const navigate = useNavigate()

  const movePhotoDetail = listitem => {
    navigate('/album/photodetail', {
      state: {
        photoInfo: listitem,
      },
    })
  }

  return (
    <div className="photolist">
      <p className="photolist-text">나만의 네컷 목록</p>
      <hr />
      <div className="photolist-box">
        {photolist.map(listitem => (
          <div
            key={listitem.photoId}
            role="button"
            tabIndex={0}
            className="photolist-item"
            onClick={() => movePhotoDetail(listitem)}
            onKeyUp={() => movePhotoDetail(listitem)}
          >
            <InsertPhotoOutlinedIcon className="photolist-icon" />
            <div className="photolist-title">{listitem.title} &nbsp;</div>
            <div className="photolist-date">
              {listitem.recordDt.replace('-', '.').replace('-', '.')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhotoList
