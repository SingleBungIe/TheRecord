import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import iro from '@jaames/iro'
import Navigation from '../../components/Navigation'
import darkLogo from '../../assets/dark_logo.png'
import lightLogo from '../../assets/light_logo.png'

function PhotoFrame() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [frameColor, setFrameColor] = useState('rgb(0,0,0)')
  const [previewImg, setpreviewImg] = useState()
  const [colorPicker, setColorPicker] = useState()
  const [logoColor, setLogoColor] = useState()

  useEffect(() => {
    const canvas = document.querySelector('#preview-frame')
    const ctx = canvas.getContext('2d')
    canvas.width = 190
    canvas.height = 420
    const doneImgUrl = state.doneImg
    const byteString = window.atob(doneImgUrl.split(',')[1])
    const array = []
    for (let i = 0; i < byteString.length; i++) {
      array.push(byteString.charCodeAt(i))
    }
    const arrayBufferView = new Uint8Array(array)
    const blob = new Blob([arrayBufferView], { type: 'image/png' })
    const urlCreator = window.URL || window.webkitURL
    const imgUrl = urlCreator.createObjectURL(blob)
    setpreviewImg(imgUrl)
    const img = document.createElement('img')
    img.src = imgUrl
    setTimeout(() => {})
    img.addEventListener('load', () => {
      ctx.drawImage(img, 5, 0, img.width * 0.8, img.height * 0.8)
    })
  }, [])

  useEffect(() => {
    setColorPicker(
      new iro.ColorPicker('#picker', {
        width: 260,
        color: '#f00',
      }),
    )
  }, [])

  useEffect(() => {
    if (colorPicker) {
      colorPicker.on('color:change', color => {
        const framergb = `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`
        setFrameColor(() => framergb)
      })
    }
  }, [colorPicker])

  const handleLogo = logoMode => {
    setLogoColor(logoMode)
    const previewCanvas = document.querySelector('#preview-frame')
    const ctx = previewCanvas.getContext('2d')
    const logoImg = document.createElement('img')
    if (logoMode === 'dark') {
      logoImg.src = darkLogo
    } else {
      logoImg.src = lightLogo
    }
    ctx.fillStyle = frameColor
    ctx.fillRect(53, 365, 80, 40)
    ctx.drawImage(logoImg, 53, 365, 80, 40)
  }

  useEffect(() => {
    const canvas = document.querySelector('#preview-frame')
    canvas.style.backgroundColor = frameColor
    handleLogo(logoColor)
    canvas.style.border = '2px solid gray'
  }, [frameColor])

  const downloadImg = () => {
    const newCanvas = document.querySelector('#done-img')
    newCanvas.width = 220
    newCanvas.height = 560
    const ctx = newCanvas.getContext('2d')
    ctx.fillStyle = frameColor
    ctx.fillRect(0, 0, 220, 550)

    const img = document.createElement('img')
    img.src = previewImg
    img.addEventListener('load', () => {
      ctx.drawImage(img, 0, 0, img.width, img.height)
    })

    const logoImg = document.createElement('img')
    if (logoColor === 'dark') {
      logoImg.src = darkLogo
    } else {
      logoImg.src = lightLogo
    }
    ctx.drawImage(logoImg, 60, 470, 100, 50)

    setTimeout(() => {
      const link = document.createElement('a')
      link.download = 'hello.png'
      link.href = document.getElementById('done-img').toDataURL('image/png')
      link.click()
    }, 3000)
  }

  const moveDeco = () => {
    navigate('/album/photodeco')
  }

  return (
    <div id="photo-frame">
      <div className="bg-white-left">
        <div className="frame-preview-box">
          <canvas id="preview-frame" />
        </div>
      </div>
      <div className="bg-white-right">
        <div className="custom-frame-box">
          <div className="color-picker-box">
            <div id="picker" />
            <div className="choose-logo-box">
              <div className="dark-logo logo-check">
                <p>Dark</p>
                <button
                  type="button"
                  className="logo-img-box"
                  onClick={() => handleLogo('dark')}
                >
                  <img src={darkLogo} alt="검정로고" />
                </button>
              </div>
              <div className="light-logo logo-check">
                <p>Light</p>
                <button
                  type="button"
                  className="logo-img-box"
                  onClick={() => handleLogo('light')}
                >
                  <img src={lightLogo} alt="밝은로고" />
                </button>
              </div>
            </div>
          </div>
          <div className="frame-btn-group">
            <button type="button" onClick={() => downloadImg()}>
              다운 받기
            </button>
            <button type="button" onClick={() => moveDeco()}>
              꾸미러 가기
            </button>
          </div>
          <canvas id="done-img" hidden />
        </div>
        <Navigation />
      </div>
    </div>
  )
}

export default PhotoFrame
