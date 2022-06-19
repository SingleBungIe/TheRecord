import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import '../../styles/diary/diarymain.css'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import DiaryItem from './DiaryItem'

function DiaryList({ sendDelete }) {
  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [openCheckDialog, setOpenCheckDialog] = useState(false)
  const [folder, setFolder] = useState(-1)
  const [deleteFolderId, setDeleteFolderId] = useState(-1)
  const [folderName, setFolderName] = useState('')
  const loginUserInfo = useSelector(state => state.common.loginUserInfo)
  const homePageHostInfo = useSelector(state => state.common.homePageHostInfo)
  const [diarylist, setDiarylist] = useState([])
  useEffect(() => {
    axios
      .get(
        `https://the-record.co.kr:8080/api/folder/${homePageHostInfo.userPk}`,
        {
          headers: {
            'x-auth-token': sessionStorage.getItem('jwt'),
          },
        },
      )
      .then(res => {
        setDiarylist(res.data)
      })
  }, [])

  const openList = folderId => {
    if (folderId === folder) {
      setOpen(!open)
    } else {
      setFolder(folderId)
      setOpen(true)
    }
  }

  const resetFolder = () => {
    axios
      .get(
        `https://the-record.co.kr:8080/api/folder/${homePageHostInfo.userPk}`,
        {
          headers: {
            'x-auth-token': sessionStorage.getItem('jwt'),
          },
        },
      )
      .then(res => {
        setDiarylist(res.data)
      })
  }

  const changeFolderName = id => {
    if (folderName.length === 0) {
      alert('폴더 이름을 입력해주세요')
    } else {
      axios({
        method: 'put',
        url: 'https://the-record.co.kr:8080/api/folder',
        data: {
          folderId: id,
          name: folderName,
        },
        headers: {
          'x-auth-token': sessionStorage.getItem('jwt'),
        },
      }).then(() => {
        resetFolder()
      })
    }
  }

  const checkDelete = id => {
    if (diarylist.length > 1) {
      setOpenCheckDialog(true)
      setDeleteFolderId(id)
    } else {
      alert('폴더는 한 개 이상 있어야 합니다')
    }
  }

  const deleteFolder = () => {
    if (diarylist.length > 1) {
      axios({
        method: 'delete',
        url: `https://the-record.co.kr/api/folder/${deleteFolderId}`,
        headers: {
          'x-auth-token': sessionStorage.getItem('jwt'),
        },
      }).then(res => {
        if (res.data === 'success') {
          resetFolder()
        }
      })
    } else {
      alert('폴더는 한 개 이상 있어야합니다')
    }
  }

  const addFolder = () => {
    axios({
      method: 'POST',
      url: 'https://the-record.co.kr:8080/api/folder',
      data: {
        name: '새 폴더',
      },
      headers: {
        'x-auth-token': sessionStorage.getItem('jwt'),
      },
    }).then(() => {
      resetFolder()
    })
  }

  const openSelectDialog = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    resetFolder()
    setOpenDialog(false)
    sendDelete()
  }

  const handleCloseCheck = () => {
    setOpenCheckDialog(false)
  }

  return (
    <div className="diarylist">
      <div className="diarylist-header">
        <p className="diarylist-text">일기목록</p>
        {loginUserInfo.userPk === homePageHostInfo.userPk ? (
          <button
            type="button"
            className="diarylist-folder-btn"
            onClick={() => {
              openSelectDialog()
            }}
          >
            폴더 수정
          </button>
        ) : (
          ''
        )}
      </div>
      <hr />

      <div className="diarylist-box">
        {diarylist.map(listitem => (
          <div className="diarylist-folder" key={listitem.folderId}>
            <div
              role="button"
              tabIndex={0}
              className="diarylist-item"
              onClick={() => openList(listitem.folderId)}
              onKeyUp={() => openList(listitem.folderId)}
            >
              <FolderOpenIcon className="diarylist-icon" />
              <div className="diarylist-title">{listitem.name} &nbsp;</div>
            </div>
            {listitem.folderId === folder && open ? (
              <DiaryItem folder={folder} />
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        id="dialog"
        className="diary-folder-dialog"
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
            <p>폴더 관리</p>
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
          <div className="folder-dialog-body">
            <div className="folder-dialog-header">
              <button
                type="button"
                className="folder-dialog-plus-btn"
                onClick={() => addFolder()}
              >
                + 폴더 생성
              </button>
            </div>
            <div className="folder-dialog-box">
              <div className="folder-dialog-list">
                {diarylist.map(listitem => (
                  <div className="folder-dialog-item" key={listitem.folderId}>
                    <div className="folder-dialog-icon">
                      <FolderOpenIcon />
                      <input
                        type="text"
                        className="folder-dialog-title"
                        defaultValue={listitem.name}
                        maxLength={30}
                        onBlur={() => {
                          changeFolderName(listitem.folderId)
                        }}
                        onClick={e => {
                          setFolderName(e.target.value)
                        }}
                        onChange={e => {
                          setFolderName(e.target.value)
                        }}
                      />
                    </div>
                    <DeleteIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => checkDelete(listitem.folderId)}
                    />
                  </div>
                ))}
              </div>
              <p>
                <ModeOutlinedIcon sx={{ fontSize: 'small' }} />
                폴더를 클릭하여 이름을 변경해보세요
              </p>
            </div>
            <div className="folder-dialog-btn-div">
              <button
                type="button"
                className="folder-dialog-btn"
                onMouseDown={() => {
                  handleClose()
                }}
              >
                수정 완료
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={openCheckDialog}
        onClose={handleCloseCheck}
        id="dialog"
        className="delete-folder-dialog"
        aria-labelledby="dialog-container"
        aria-describedby="dialog-description"
        PaperProps={{
          sx: {
            minWidth: 500,
            borderRadius: 2.7,
          },
        }}
      >
        <DialogTitle id="dialog-container" className="dialog-header">
          <div className="dialog-title" />
          <Button
            sx={{
              minWidth: 36,
              height: 49,
            }}
            onClick={() => {
              handleCloseCheck()
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
          <div className="delete-folder-dialog-body">
            <div>폴더 안의 모든 일기가 지워집니다.</div>
            <div className="delete-folder-dialog-text">삭제하시겠습니까?</div>
            <div>
              <button
                className="delete-folder-delete-btn"
                type="button"
                onClick={() => {
                  deleteFolder()
                  handleCloseCheck()
                }}
              >
                삭제
              </button>
              <button
                className="delete-folder-cancel-btn"
                type="button"
                onClick={() => {
                  handleCloseCheck()
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default DiaryList
