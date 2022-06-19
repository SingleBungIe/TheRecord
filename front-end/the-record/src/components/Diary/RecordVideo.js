import React, { useRef, useState } from 'react'
// import axios from 'axios';

function RecordVideo({ sendVideo, sendText }) {
  const videoRef = useRef(null)
  const [recorded, setRecorded] = useState(false)
  const [recordedVideoURL, setrecordedVideoURL] = useState()
  const [videoRecorder, setVideoRecorder] = useState({})
  const [speechRecognizer, setSpeechRecognizer] = useState({})
  const [recordingText, setRecordingText] = useState('')

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
            // setRecordingText(recordingText + transcript)
          }
          setRecordingText(finalTranscripts)
          sendText(finalTranscripts)
        }
      }
    }
  }

  const recordingStart = mediaStream => {
    voiceTextStart()
    const videoData = []
    const newVideoRecorder = new MediaRecorder(mediaStream, {
      mimeType: 'video/webm; codecs=vp9',
    })

    newVideoRecorder.ondataavailable = event => {
      if (event.data?.size > 0) {
        videoData.push(event.data)
      }
    }

    newVideoRecorder.onstop = () => {
      const videoBlob = new Blob(videoData, { type: 'video/mp4' })
      setrecordedVideoURL(window.URL.createObjectURL(videoBlob))
      const formdata = new FormData()
      formdata.append('file', videoBlob)
      sendVideo(formdata)
    }

    newVideoRecorder.start()
    setVideoRecorder(newVideoRecorder)
  }

  const videoCaptureStart = () => {
    setrecordedVideoURL(null)
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: 360,
          height: 170,
        },
      })
      .then(mediaStream => {
        videoRef.current.srcObject = mediaStream
        videoRef.onloadedmetadata = () => {
          videoRef.play()
        }
        setRecorded(true)
        recordingStart(mediaStream)
      })
  }

  const VideoCaptureEnd = () => {
    speechRecognizer.stop()
    const tracks = videoRef.current.srcObject.getTracks()
    tracks.forEach(track => {
      track.stop()
    })

    if (videoRecorder) {
      videoRecorder.stop()
      setVideoRecorder(null)
      setRecorded(false)
    }
  }

  return (
    <div className="record-video">
      <div className="record-video-btn-div">
        {recorded ? (
          <button
            type="button"
            className="record-video-cancel-btn"
            onClick={() => {
              VideoCaptureEnd()
            }}
          >
            녹화 끝
          </button>
        ) : (
          <button
            type="button"
            className="record-video-btn"
            onClick={() => {
              videoCaptureStart()
            }}
          >
            녹화 시작
          </button>
        )}
      </div>

      <div className="record-video-box">
        {recordedVideoURL === null ? (
          <video ref={videoRef} autoPlay className="video-div" muted>
            <track kind="captions" />
          </video>
        ) : null}
        {recordedVideoURL ? (
          <>
            <video
              src={recordedVideoURL}
              autoPlay
              controls
              className="video-div"
            >
              <track kind="captions" />
            </video>
            <textarea
              className="record-video-text"
              defaultValue={recordingText}
              onChange={e => sendText(e.target.value)}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

export default RecordVideo
