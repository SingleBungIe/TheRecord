import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../styles/photo/album.css'
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

function PhotoPreview() {
  const navigate = useNavigate()
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo)
  const [photolist, setPhotolist] = useState([])
  const [page, setPage] = React.useState(0)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    axios
      .get(
        `https://the-record.co.kr:8080/api/photo/${homePageHostInfo.userPk}/${page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': sessionStorage.getItem('jwt'),
          },
        },
      )
      .then(res => {
        setPhotolist(res.data)
      })
  }, [page])

  useEffect(() => {
    axios
      .get(
        `https://the-record.co.kr:8080/api/photo/${homePageHostInfo.userPk}/page`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': sessionStorage.getItem('jwt'),
          },
        },
      )
      .then(res => {
        setTotalPage(res.data)
      })
  }, [])
  const changePage = (event, value) => {
    setPage(value - 1)
  }

  const moveRight = () => {
    const newPage = page + 1
    setPage(newPage)
  }

  const moveLeft = () => {
    const newPage = page - 1
    setPage(newPage)
  }

  const movePhotoDetail = photo => {
    navigate('/album/photodetail', {
      state: {
        photoInfo: photo,
      },
    })
  }

  return (
    <div id="photopreview">
      <div className="photopreview">
        {totalPage > 0 && page !== 0 ? (
          <button
            type="button"
            className="preview-arrow-btn"
            onClick={moveLeft}
          >
            <ArrowLeftOutlinedIcon />
          </button>
        ) : (
          <ArrowLeftOutlinedIcon className="preview-no-btn" />
        )}
        {photolist.length === 0 ? (
          <div style={{ marginTop: '20px' }}>아직 업로드한 사진이 없습니다</div>
        ) : (
          photolist.map(photo => (
            <div
              key={photo.photoId}
              className="preview-item"
              role="button"
              tabIndex={0}
              onClick={() => movePhotoDetail(photo)}
              onKeyUp={() => movePhotoDetail(photo)}
            >
              <div className="preview-title">{photo.title}</div>
              <img
                src={`https://s3.ap-northeast-2.amazonaws.com/the-record.bucket/${photo.mediaUrl}`}
                alt="인생네컷"
                className="preview-img"
              />
              <div className="preview-date">
                {photo.recordDt.replace('-', '.').replace('-', '.')}
              </div>
            </div>
          ))
        )}
        {totalPage > 0 && page !== totalPage ? (
          <button
            type="button"
            className="preview-arrow-btn"
            onClick={moveRight}
          >
            <ArrowRightOutlinedIcon />
          </button>
        ) : (
          <ArrowRightOutlinedIcon className="preview-no-btn" />
        )}
      </div>
      <div className="preview-pagebtn">
        {totalPage > 0 ? (
          <Stack>
            <Pagination
              count={totalPage + 1}
              page={page + 1}
              onChange={changePage}
              size="small"
            />
          </Stack>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default PhotoPreview
