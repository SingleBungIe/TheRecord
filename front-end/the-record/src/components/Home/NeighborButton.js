import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import HomeIcon from '@mui/icons-material/Home'
import StarIcon from '@mui/icons-material/Star'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import MyNeighborList from './MyNeighborList'
import callApi from '../../common/api'
import store from '../../store'
import { types } from '../../actions/common'

function NeighborButton() {
  const navigate = useNavigate()
  const handleHost = neighbor => {
    store.dispatch({
      type: types.FETCH_USER_INFO,
      userInfo: neighbor,
      key: 'homePageHostInfo',
    })
    navigate('/home')
  }

  const [neighborName, setNeighborName] = useState('')
  const [neighborDialogOpen, setNeighborDialogOpen] = useState(false)
  const [neighborList, setNeighborList] = useState([])

  const handleClose = () => {
    setNeighborDialogOpen(false)
    setNeighborName('')
    setNeighborList([])
  }

  const searchNeighbor = async () => {
    const res = await callApi({ url: `/api/user/${neighborName}` })
    setNeighborList(res)

    // document.querySelector('.neighbor-input').value = '';
  }

  const searchResult = () => {
    if (neighborList.length === 0) {
      return (
        <p style={{ width: '100%', textAlign: 'center' }}>
          이름을 입력하여 친구를 찾아보세요
        </p>
      )
    }
    return neighborList.map(neighbor => (
      <div className="neighbor-searchlist-item" key={neighbor.userPk}>
        <button
          type="button"
          onClick={() => [handleHost(neighbor), handleClose()]}
        >
          <HomeIcon sx={{ mr: 1 }} />
          {neighbor.name}({neighbor.userId})
        </button>
      </div>
    ))
  }

  return (
    <div id="neighbor-button">
      <button
        className="ilchon-button"
        type="button"
        onClick={() => {
          setNeighborDialogOpen(true)
        }}
      >
        <StarIcon sx={{ mr: 1 }} />
        일촌 관리
      </button>

      <div>
        <Dialog
          open={neighborDialogOpen}
          onClose={handleClose}
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
              <StarIcon sx={{ mr: 1 }} />
              <p>일촌 관리</p>
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
            <div className="dialog-body neighbor-button-dialog-body">
              <div className="neighbor-search-box">
                <div className="neighbor-search">
                  <SearchRoundedIcon
                    sx={{
                      fontSize: 36,
                      pb: 0.3,
                    }}
                  />
                  <input
                    className="neighbor-input"
                    placeholder="친구 찾기"
                    onChange={e => {
                      setNeighborName(e.target.value)
                    }}
                    onKeyDown={e => {
                      if (e.keyCode === 13) {
                        searchNeighbor()
                      }
                    }}
                  />
                  <button type="button" onClick={() => searchNeighbor()}>
                    검색
                  </button>
                </div>
                <div className="neighbor-searchlist-box">{searchResult()}</div>
              </div>
              <MyNeighborList />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  )
}

export default NeighborButton
