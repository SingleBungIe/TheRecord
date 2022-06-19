import React, { useState } from 'react'
import '../../styles/diary/makediary.css'

function RecordVoice({ sendVoice, sendText }) {
  const [media, setMedia] = useState()
  const [isRecord, setIsRecord] = useState(false)
  const [speechRecognizer, setSpeechRecognizer] = useState({})
  const [recordingText, setRecordingText] = useState('')
  const [localStream, setLocalStream] = useState('')
  const [isFinished, setIsFinished] = useState(false)

  const voiceTextStart = () => {
    if ('webkitSpeechRecognition' in window) {
      // eslint-disable-next-line
      const NewSpeechRecognizer = new window.webkitSpeechRecognition()
      NewSpeechRecognizer.continuous = true

      NewSpeechRecognizer.interimResults = true

      NewSpeechRecognizer.lang = 'ko-KR'

      NewSpeechRecognizer.start()

      setSpeechRecognizer(NewSpeechRecognizer)

      let finalTranscripts = ''

      NewSpeechRecognizer.onresult = event => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const { transcript } = event.results[i][0]
          transcript.replace('\n', '<br>')

          if (event.results[i].isFinal) {
            finalTranscripts += transcript
          }
          setRecordingText(finalTranscripts)
          sendText(finalTranscripts)
        }
      }
    }
  }

  const voiceRecordStart = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm',
        })
        setLocalStream(stream)
        voiceTextStart()
        mediaRecorder.start()
        setMedia(mediaRecorder)
      })
  }

  const voiceRecordStop = () => {
    setIsFinished(true)
    speechRecognizer.stop()
    localStream.getTracks()[0].stop()
    media.ondataavailable = e => {
      const blob = new Blob([e.data], { type: 'audio/webm' })
      const formdata = new FormData()
      formdata.append('file', blob)
      sendVoice(formdata)
    }
    media.stop()
  }

  const recordVoice = () => {
    if (isRecord) {
      return (
        <button
          type="button"
          className="record-voice-btn"
          onClick={() => {
            voiceRecordStop()
            setIsRecord(false)
          }}
        >
          <img
            src={require('../../assets/MIC.png')}
            alt="녹화"
            className="profile-img"
          />
        </button>
      )
    }
    return (
      <button
        type="button"
        className="record-voice-btn"
        onClick={() => {
          voiceRecordStart()
          setIsRecord(true)
        }}
      >
        <img
          src={require('../../assets/MIC.png')}
          alt="녹화"
          className="profile-img"
        />
      </button>
    )
  }

  return (
    <div className="record-voice">
      <div className="wrapper-div">
        <div className="first-wrapper">
          <div className="sound-wave">
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
          </div>
        </div>
        <div className="second-wrapper">
          <div className="sound-wave">
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
          </div>
        </div>
        {recordVoice()}
        <div className="third-wrapper">
          <div className="sound-wave">
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
          </div>
        </div>
        <div className="fourth-wrapper">
          <div className="sound-wave">
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
            <div className={isRecord ? 'sound-bar' : 'bar'} />
          </div>
        </div>
      </div>
      <div className="record-text-div">
        <textarea
          // eslint-disable-next-line
          disabled={isFinished ? false : true}
          className="record-text"
          defaultValue={recordingText}
          onChange={e => sendText(e.target.value)}
        />
      </div>
    </div>
  )
}

export default RecordVoice
