/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react'
import { OpenVidu } from 'openvidu-browser'
import axios from 'axios'
import withRouter from '../../components/withRouter'
import Navigation from '../../components/Navigation'
import '../../styles/photo/photobooth.css'
import UserVideoComponent from '../../components/Album/UserVideoComponent'
import callApi from '../../common/api'

const OPENVIDU_SERVER_URL = 'https://the-record.co.kr:4443'
const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_SERVER_SECRET
const { REACT_APP_REMOVEBG_API_TOKEN } = process.env

class PhotoBooth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mySessionId: '',
      myUserName: '',
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      joinPeople: [],
      photoNum: 0,
      donePhoto: 0,
    }

    this.joinSession = this.joinSession.bind(this)
    this.leaveSession = this.leaveSession.bind(this)
    this.switchCamera = this.switchCamera.bind(this)
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this)
    this.handleChangeUserName = this.handleChangeUserName.bind(this)
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this)
    this.onbeforeunload = this.onbeforeunload.bind(this)

    this.deleteRoom = this.deleteRoom.bind(this)
    this.takePhoto = this.takePhoto.bind(this)
    this.finishPhoto = this.finishPhoto.bind(this)
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload)

    const { peopleNum, backgroundColor, loginUserInfo, roomcode } =
      this.props.location.state

    if (roomcode)
      this.setState({
        peopleNum,
        backgroundColor,
        mySessionId: roomcode,
        myUserName: loginUserInfo.name,
        loginUserInfo,
      })
    else
      this.setState({
        peopleNum,
        backgroundColor,
        mySessionId: loginUserInfo.userId,
        myUserName: loginUserInfo.name,
        loginUserInfo,
      })

    this.joinSession()
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.donePhoto >= 4 &&
      this.state.donePhoto !== prevState.donePhoto
    ) {
      setTimeout(() => {
        this.props.navigate('/album/photoframe', {
          state: {
            doneImg: document.querySelector('#show').toDataURL('image/png'),
          },
        })
      }, 3500)
      this.leaveSession()
      if (!this.state.roomcode) {
        callApi({
          method: 'put',
          url: `/api/photobooth/${this.state.loginUserInfo.userId}`,
        })
      }
    }
  }

  onbeforeunload(event) {
    this.leaveSession()
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    })
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    })
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      })
    }
  }

  deleteSubscriber(streamManager) {
    const { subscribers } = this.state
    const index = subscribers.indexOf(streamManager, 0)
    if (index > -1) {
      subscribers.splice(index, 1)
      this.setState({
        subscribers,
      })
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu()

    // --- 2) Init a session ---
    // e.preventDefault();
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        const mySession = this.state.session

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', event => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          const subscriber = mySession.subscribe(event.stream, undefined)
          const { subscribers } = this.state
          subscribers.push(subscriber)
          this.state.joinPeople.push(subscriber.stream.session.connection.data)

          // Update the state with the new subscribers
          this.setState({
            subscribers,
          })
        })

        // On every Stream destroyed...
        mySession.on('streamDestroyed', event => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager)
        })

        // On every asynchronous exception...
        mySession.on('exception', exception => {
          console.warn(exception)
        })

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then(token => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              const devices = await this.OV.getDevices()
              const videoDevices = devices.filter(
                device => device.kind === 'videoinput',
              )

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              const publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              })

              // --- 6) Publish your stream ---

              mySession.publish(publisher)

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher,
              })
            })
        })
      },
    )
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session

    if (mySession) {
      mySession.disconnect()
    }

    // Empty all properties...
    this.OV = null
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: '',
      myUserName: `Participant${Math.floor(Math.random() * 100)}`,
      mainStreamManager: undefined,
      publisher: undefined,
    })
  }

  deleteRoom() {
    if (!this.state.roomcode) {
      callApi({
        method: 'put',
        url: `/api/photobooth/${this.state.loginUserInfo.userId}`,
      })
    }
    this.props.navigate('/album')
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices()
      const videoDevices = devices.filter(
        device => device.kind === 'videoinput',
      )

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          device => device.deviceId !== this.state.currentVideoDevice.deviceId,
        )

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          const newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          })

          // newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager)

          await this.state.session.publish(newPublisher)
          this.setState({
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          })
        }
      }
    } catch {
      alert('에러가 발생했습니다')
    }
  }

  takePhoto() {
    if (this.state.photoNum < 4) {
      const video = document.querySelectorAll('video')
      const canvas = document.getElementById(`canvas-${this.state.photoNum}`)
      const ctx = canvas.getContext('2d')
      canvas.width = 190
      canvas.height = 110
      video.forEach((element, index) => {
        ctx.drawImage(
          element,
          160,
          0,
          element.clientWidth * 5,
          element.clientHeight * 5,
          element.clientWidth * index * 0.33,
          0,
          element.clientWidth,
          element.clientHeight,
        )
      })

      canvas.toDataURL('image/png')
      this.setState(state => {
        return { photoNum: state.photoNum + 1 }
      })
    } else {
      alert('네번의 촬영이 완료되었습니다')
    }
  }

  finishPhoto() {
    if (this.state.photoNum >= 4) {
      const fourPhoto = document.querySelectorAll('canvas')
      const canvas = document.querySelector('#show')
      const ctx = canvas.getContext('2d')
      canvas.width = 220
      canvas.height = 470

      fourPhoto.forEach((element, index) => {
        const dataUrl = element.toDataURL('image/png')
        const imageUrl = dataUrl.split(',')[1]

        const formData = new FormData()
        formData.append('size', 'auto')
        formData.append('image_file_b64', imageUrl)

        // 배경 없애기 remove.bg
        axios({
          method: 'post',
          url: 'https://api.remove.bg/v1.0/removebg',
          data: formData,
          responseType: 'arraybuffer',
          headers: {
            ...formData.getHeaders,
            'X-Api-Key': REACT_APP_REMOVEBG_API_TOKEN,
          },
          encoding: null,
        })
          .then(response => {
            if (response.status !== 200)
              return console.error(
                'Error:',
                response.status,
                response.statusText,
              )
            const arrayBufferView = new Uint8Array(response.data)
            const blob = new Blob([arrayBufferView], { type: 'image/png' })
            const urlCreator = window.URL || window.webkitURL
            const imgUrl = urlCreator.createObjectURL(blob)
            const img = document.createElement('img')
            img.src = imgUrl

            img.addEventListener('load', e => {
              ctx.drawImage(img, 15, element.clientHeight * index + 20)
            })
          })
          .then(() => {
            this.setState(state => {
              return { donePhoto: state.donePhoto + 1 }
            })
          })
        ctx.fillStyle = this.state.backgroundColor
        ctx.fillRect(
          15,
          element.clientHeight * index + 20,
          element.clientWidth,
          element.clientHeight - 14,
        )
      })
    } else {
      alert('네번의 촬영을 완료해주세요!')
    }
  }

  render() {
    const { mySessionId } = this.state
    const { myUserName } = this.state

    return (
      <div id="photobooth">
        <div className="bg-white-left">
          <div className="photo-preview-box">
            <canvas id="canvas-0" />
            <canvas id="canvas-1" />
            <canvas id="canvas-2" />
            <canvas id="canvas-3" />
          </div>
        </div>
        <div className="bg-white-right">
          <div className="container">
            {this.state.session !== undefined ? (
              <div id="session">
                <div id="session-header">
                  <input
                    style={{
                      width: 130,
                      height: 40,
                      marginBottom: 15,
                      backgroundColor: '#4BB6D1',
                      fontFamily: 'dunggeunmo',
                      color: 'white',
                      fontSize: '16px',
                      border: 'none',
                      borderRadius: '16px',
                      cursor: 'pointer',
                    }}
                    type="button"
                    id="buttonLeaveSession"
                    onClick={() => [this.leaveSession(), this.deleteRoom()]}
                    value="방 떠나기"
                  />
                </div>
                <div id="video-container">
                  {this.state.publisher !== undefined ? (
                    <div
                      className="stream-container"
                      onClick={() =>
                        this.handleMainVideoStream(this.state.publisher)
                      }
                    >
                      <UserVideoComponent
                        streamManager={this.state.publisher}
                      />
                    </div>
                  ) : null}
                  {this.state.subscribers.map((sub, i) => (
                    <div
                      key={i}
                      className="stream-container"
                      onClick={() => this.handleMainVideoStream(sub)}
                    >
                      <UserVideoComponent streamManager={sub} />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="photo-btn-group">
              {this.state.peopleNum <= this.state.subscribers.length + 1 &&
              this.state.mySessionId === this.state.loginUserInfo.userId ? (
                <>
                  <button
                    className="take-photo-btn"
                    onClick={this.takePhoto}
                    type="button"
                  >
                    찰칵
                  </button>
                  <button
                    className="finish-photo-btn"
                    onClick={this.finishPhoto}
                    type="button"
                  >
                    사진촬영 완료
                  </button>
                </>
              ) : (
                <>
                  <button disabled className="disable-photo-btn" type="button">
                    찰칵
                  </button>
                  <button disabled className="disable-photo-btn" type="button">
                    사진촬영 완료
                  </button>
                </>
              )}
              <canvas id="show" />
            </div>
          </div>
          <Navigation />
        </div>
      </div>
    )
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then(sessionId =>
      this.createToken(sessionId),
    )
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ customSessionId: sessionId })
      axios
        .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, {
          headers: {
            Authorization: `Basic ${btoa(
              `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
            )}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          resolve(response.data.id)
        })
        .catch(response => {
          const error = { ...response }
          if (error?.response?.status === 409) {
            resolve(sessionId)
          } else {
            console.warn(
              `No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL} OPENVIDU_SERVER_SECRET:${OPENVIDU_SERVER_SECRET}`,
            )
            if (
              window.confirm(
                `No connection to OpenVidu Server. This may be a certificate error at "${OPENVIDU_SERVER_URL}"\n\nClick OK to navigate and accept it. ` +
                  `If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`,
              )
            ) {
              window.location.assign(
                `${OPENVIDU_SERVER_URL}/accept-certificate`,
              )
            }
          }
        })
    })
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      const data = {}
      axios
        .post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
          data,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
              )}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          resolve(response.data.token)
        })
        .catch(error => reject(error))
    })
  }
}

export default withRouter(PhotoBooth)
