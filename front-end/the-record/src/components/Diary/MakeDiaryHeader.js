import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'

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

function MakeDiaryHeader({ sendTitle, sendFolder, sendVisible, info }) {
  const loginUserInfo = useSelector(state => state.common.loginUserInfo)
  const [checked, setChecked] = useState(info.visible)
  const [folderListOpen, setFolderListOpen] = useState(false)
  const [folderlist, setFolderlist] = useState([])
  const [selectedFolder, setSelectedFolder] = useState(info.folder)

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://the-record.co.kr:8080/api/folder/${loginUserInfo.userPk}`,
      headers: {
        'x-auth-token': sessionStorage.getItem('jwt'),
      },
    })
      .then(res => {
        setFolderlist(res.data)
      })
      .catch(() => {
        alert('문제가 발생했습니다.')
      })
  }, [])

  return (
    <div className="make-diary-header">
      <input
        type="text"
        maxLength="20"
        placeholder="일기 제목을 입력해주세요"
        onChange={e => sendTitle(e.target.value)}
        defaultValue={info.title}
      />
      <div className="make-diary-header-div">
        <div>
          <button
            type="button"
            onClick={() => setFolderListOpen(!folderListOpen)}
            className="make-diary-input"
          >
            <FolderOpenIcon
              sx={{ fontSize: 'medium' }}
              style={{ marginRight: '3px' }}
            />
            {selectedFolder}
            {folderListOpen ? (
              <ArrowDropUpIcon color="action" />
            ) : (
              <ArrowDropDownIcon color="action" />
            )}
          </button>
          <div className="make-diary-list">
            {folderListOpen
              ? folderlist.map(folder => (
                  <button
                    type="button"
                    className="make-diary-listitem"
                    key={folder.folderId}
                    onClick={() => [
                      setSelectedFolder(folder.name),
                      setFolderListOpen(false),
                      sendFolder(folder.folderId),
                    ]}
                  >
                    <FolderOpenIcon
                      sx={{ fontSize: 'medium' }}
                      style={{ marginRight: '3px' }}
                    />
                    {folder.name}
                  </button>
                ))
              : ''}
          </div>
        </div>
        <div className="make-diary-header-visible">
          <p>나만 보기</p>
          <AntSwitch
            checked={checked}
            onChange={event => [
              setChecked(event.target.checked),
              sendVisible(event.target.checked),
            ]}
            inputProps={{ 'aria-label': 'ant design' }}
          />
        </div>
      </div>
    </div>
  )
}

export default MakeDiaryHeader
