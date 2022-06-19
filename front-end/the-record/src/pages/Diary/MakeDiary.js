import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import Navigation from '../../components/Navigation'
import '../../styles/diary/makediary.css'
import DiaryList from '../../components/Diary/DiaryList'
import MakeDiaryButton from '../../components/Diary/MakeDiaryButton'
import MakeDiaryHeader from '../../components/Diary/MakeDiaryHeader'
import RecordVideo from '../../components/Diary/RecordVideo'
import RecordVoice from '../../components/Diary/RecordVoice'
import UploadPicture from '../../components/Diary/UploadPicture'

function MakeDiary() {
  const category = useLocation().state
  const navigate = useNavigate()
  const [diaryDto, setDiaryDto] = useState({
    // eslint-disable-next-line
    category: category,
    content: '',
  })
  const [diaryInfo, setDiaryInfo] = useState({
    folderId: '',
    title: '',
    visible: 'PUBLIC',
  })
  const [form, setForm] = useState()
  const info = {
    title: '',
    folder: '',
    visible: false,
  }

  const setDto = ({ item, value }) => {
    const newDto = {
      ...diaryDto,
      [item]: value,
    }
    setDiaryDto(newDto)
  }

  const setOtherDto = ({ item, value }) => {
    const newDto = {
      ...diaryInfo,
      [item]: value,
    }
    setDiaryInfo(newDto)
  }

  const checkCategory = () => {
    if (category === 'VIDEO') {
      return (
        <RecordVideo
          sendVideo={e => [setForm(e)]}
          sendText={e => setDto({ item: 'content', value: e })}
        />
      )
    }
    if (category === 'PICTURE') {
      return (
        <UploadPicture
          sendPhoto={e => [setForm(e)]}
          sendText={e => setDto({ item: 'content', value: e })}
        />
      )
    }
    return (
      <RecordVoice
        sendVoice={e => [setForm(e)]}
        sendText={e => setDto({ item: 'content', value: e })}
      />
    )
  }

  const uploadDiary = () => {
    if (form && diaryInfo.folderId && diaryInfo.title) {
      const result = { ...diaryDto, ...diaryInfo }
      form.append(
        'diaryDto',
        new Blob([JSON.stringify(result)], { type: 'application/json' }),
      )
      axios({
        method: 'POST',
        url: 'https://the-record.co.kr:8080/api/diary',
        data: form,
        headers: {
          'x-auth-token': sessionStorage.getItem('jwt'),
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {
          if (res.data === 'success') {
            navigate('/diary')
          }
        })
        .catch(() => {
          alert('모든 항목을 채워주세요')
        })
    } else {
      alert('모든 항목을 채워주세요')
    }
  }

  const cancelUpload = () => {
    setDiaryDto({
      category: '',
      title: '',
    })
    setOtherDto({
      folderId: '',
      content: '',
      visible: 'PUBLIC',
    })
    setForm()
  }

  return (
    <div id="make-diary">
      <div className="bg-white-left">
        <div className="diary-diarylist">
          <DiaryList />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="make-diary-container">
          <div className="make-diary-box">
            <MakeDiaryHeader
              info={info}
              sendTitle={e => setOtherDto({ item: 'title', value: e })}
              sendFolder={e => setOtherDto({ item: 'folderId', value: e })}
              sendVisible={e =>
                setOtherDto({
                  item: 'visible',
                  value: e === false ? 'PUBLIC' : 'PRIVATE',
                })
              }
            />
            {checkCategory()}
          </div>
          <MakeDiaryButton
            clickUpload={uploadDiary}
            clickCancel={cancelUpload}
          />
        </div>
        <Navigation />
      </div>
    </div>
  )
}

export default MakeDiary
