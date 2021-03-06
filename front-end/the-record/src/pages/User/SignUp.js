import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, FormHelperText } from '@mui/material'
import '../../styles/signup.css'
import { makeStyles } from '@mui/styles'
import axios from 'axios'

function SignUp() {
  const useStyles = makeStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        fontFamily: 'dunggeunmo',
        fontSize: '15px',
        '& fieldset': {
          borderColor: '#dadada',
          borderWidth: 2.5,
          borderRadius: 8,
        },
        '&.Mui-focused fieldset': {
          borderColor: 'black',
          borderWidth: 2.5,
        },
      },
    },
  })

  const navigate = useNavigate()
  const [timer, setTimer] = useState(0)

  const [form, setForm] = useState({
    userId: '',
    name: '',
    email: '',
    certification: '',
    password: '',
    confirmPassword: '',
  })

  const { userId, name, email, certification, password, confirmPassword } = form

  const onChange = e => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    }
    setForm(nextForm)
  }

  const [valid, setValid] = useState({
    validId: true,
    validName: true,
    validEmail: true,
    validCertification: true,
    validPassword: true,
    validConfirmPassword: true,
  })

  const checkValid = ({ category, status }) => {
    const validation = {
      ...valid,
      [category]: status,
    }
    setValid(validation)
  }

  const goLogin = () => {
    navigate('/')
  }

  const idValidation = e => {
    if (form.userId.trim().length > 0) {
      if (timer) {
        clearTimeout(timer)
      }
      const newTimer = setTimeout(async () => {
        try {
          await axios
            .get(
              `https://the-record.co.kr:8080/api/user/id-check/${e.target.value}`,
            )
            .then(res => {
              if (res.data === true) {
                return checkValid({ category: 'validId', status: false })
              }
              return checkValid({ category: 'validId', status: true })
            })
        } catch {
          alert('????????? ??????????????????')
        }
      }, 500)
      setTimer(newTimer)
    }
  }

  function IdHelperText() {
    if (form.userId.length > 0) {
      const helperText = useMemo(() => {
        if (valid.validId) {
          return '????????????'
        }
        return '?????? ???????????? ??????????????????.'
      }, [])
      return helperText
    }
    return ''
  }

  const nameValidation = () => {
    if (form.name.length > 0) {
      checkValid({ category: 'validName', status: true })
      return false
    }
    checkValid({ category: 'validName', status: false })
    return true
  }

  function NameHelperText() {
    const helperText = useMemo(() => {
      if (valid.validName) {
        return ''
      }
      return '????????? ????????? ??? ????????????.'
    }, [])
    return helperText
  }

  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  const emailValidation = e => {
    if (re.test(e.target.value) || e.target.value.length === 0) {
      checkValid({ category: 'validEmail', status: true })
      return false
    }
    checkValid({ category: 'validEmail', status: false })
    return true
  }

  function EmailHelperText() {
    if (form.email.length > 0) {
      const helperText = useMemo(() => {
        if (valid.validEmail) {
          return '????????????'
        }
        return '????????? ????????? ????????????'
      }, [])
      return helperText
    }
    return ''
  }

  const pwValidation = e => {
    if (e.target.value.length < 8 && e.target.value.length > 0) {
      checkValid({ category: 'validPassword', status: false })
      return true
    }
    checkValid({ category: 'validPassword', status: true })
    return false
  }

  function PwHelperText() {
    if (form.password.length > 0) {
      const helperText = useMemo(() => {
        if (valid.validPassword) {
          return '????????????'
        }
        return '??????????????? 8??? ???????????????'
      }, [])
      return helperText
    }
    return ''
  }

  const checkPwValidation = e => {
    if (form.password === e.target.value && e.target.value.length > 0) {
      checkValid({ category: 'validConfirmPassword', status: true })
      return true
    }
    checkValid({ category: 'validConfirmPassword', status: false })
    return false
  }

  function CheckPwHelperText() {
    if (form.confirmPassword.length > 0) {
      const helperText = useMemo(() => {
        if (valid.validConfirmPassword) {
          return ''
        }
        return '???????????? ??????????????? ????????????.'
      }, [])
      return helperText
    }
    return ''
  }

  const sendNum = () => {
    axios
      .post('https://the-record.co.kr/api/user/email/number', {
        userEmail: form.email,
      })
      .then(() => {
        alert('??????????????? ??????????????????.')
      })
      .catch(() => {
        alert('?????? ??????????????? ??????????????????. ????????? ??????????????????')
      })
  }

  const checkNum = () => {
    axios({
      method: 'post',
      url: 'https://the-record.co.kr/api/user/email-check',
      data: {
        certificateNum: form.certification,
        userEmail: form.email,
      },
    })
      .then(res => {
        if (res.data === 'success') {
          checkValid({ category: 'validConfirmPassword', status: true })
          alert('?????????????????????.')
        } else {
          checkValid({ category: 'validConfirmPassword', status: false })
          alert('??????????????? ?????? ??????????????????')
        }
      })
      .catch(() => {
        alert('??????????????? ???????????? ?????? ??????????????????')
      })
  }

  const onSubmit = () => {
    axios({
      method: 'post',
      url: 'https://the-record.co.kr/api/user/signup',
      data: {
        userId: form.userId,
        name: form.name,
        email: form.email,
        password: form.password,
        certificateNum: form.certification,
      },
    })
      .then(() => {
        alert('??????????????? ?????????????????????.')
        goLogin()
      })
      .catch(() => {
        alert('???????????? ?????? ????????? ??????????????????')
      })
  }

  function signupButton() {
    if (
      form.userId.length > 0 &&
      form.name.length > 0 &&
      form.email.length > 0 &&
      form.certification.length > 0 &&
      form.password.length > 0 &&
      form.confirmPassword.length > 0 &&
      valid.validEmail &&
      valid.validPassword &&
      valid.validConfirmPassword &&
      valid.validId &&
      valid.validName &&
      valid.validCertification
    ) {
      return (
        <button type="button" onClick={onSubmit} className="signup-btn">
          ????????????
        </button>
      )
    }
    return (
      <button
        type="button"
        onClick={onSubmit}
        className="grey-signup-btn"
        disabled
      >
        ????????????
      </button>
    )
  }

  function sendEmailButton() {
    if (form.email.length > 0 && valid.validEmail) {
      return (
        <button type="button" className="check-btn" onClick={sendNum}>
          ??????
        </button>
      )
    }
    return (
      <button type="button" className="grey-check-btn" disabled>
        ??????
      </button>
    )
  }

  function checkNumberButton() {
    if (form.certification.length > 0 && valid.validCertification) {
      return (
        <button type="button" className="check-btn" onClick={checkNum}>
          ??????
        </button>
      )
    }
    return (
      <button type="button" className="grey-check-btn" disabled>
        ??????
      </button>
    )
  }

  return (
    <div className="signup-page">
      <form className="signup-div">
        <div className="signup-content">
          <div className="signup-title">????????????</div>
          <div className="signup-textfield">
            <TextField
              classes={useStyles()}
              error={!valid.validId}
              type="text"
              variant="outlined"
              placeholder="?????????"
              name="userId"
              onChange={e => {
                onChange(e)
                idValidation(e)
              }}
              size="small"
              fullWidth
              value={userId}
            />
            {valid.validId ? (
              <FormHelperText sx={{ color: 'green' }}>
                <IdHelperText />
              </FormHelperText>
            ) : (
              <FormHelperText sx={{ color: 'red' }}>
                <IdHelperText />
              </FormHelperText>
            )}
          </div>
          <div className="signup-textfield">
            <TextField
              classes={useStyles()}
              error={!valid.validName}
              fullWidth
              size="small"
              type="text"
              variant="outlined"
              placeholder="??????"
              name="name"
              onChange={e => {
                onChange(e)
              }}
              onBlur={() => nameValidation()}
              value={name}
            />
            <FormHelperText sx={{ color: 'red' }}>
              <NameHelperText />
            </FormHelperText>
          </div>
          <div className="signup-emailfield">
            <TextField
              classes={useStyles()}
              style={{ width: '80%' }}
              error={!valid.validEmail}
              size="small"
              type="text"
              variant="outlined"
              placeholder="?????????"
              name="email"
              onChange={e => {
                onChange(e)
                emailValidation(e)
              }}
              value={email}
            />
            {sendEmailButton()}
          </div>
          {valid.validEmail ? (
            <FormHelperText sx={{ color: 'green' }}>
              <EmailHelperText />
            </FormHelperText>
          ) : (
            <FormHelperText sx={{ color: 'red' }}>
              <EmailHelperText />
            </FormHelperText>
          )}
          <div className="signup-numberfield">
            <TextField
              classes={useStyles()}
              style={{ width: '80%' }}
              error={!valid.validCertification}
              helperText="???????????? ????????? ????????? ??????????????????"
              size="small"
              type="text"
              variant="outlined"
              placeholder="????????????"
              name="certification"
              onChange={e => {
                onChange(e)
              }}
              value={certification}
            />
            {checkNumberButton()}
          </div>
          <div className="signup-textfield">
            <TextField
              classes={useStyles()}
              error={!valid.validPassword}
              size="small"
              fullWidth
              type="password"
              variant="outlined"
              placeholder="????????????"
              name="password"
              onChange={e => {
                onChange(e)
                pwValidation(e)
              }}
              value={password}
              autoComplete="off"
            />
            {valid.validPassword ? (
              <FormHelperText sx={{ color: 'green' }}>
                <PwHelperText />
              </FormHelperText>
            ) : (
              <FormHelperText sx={{ color: 'red' }}>
                <PwHelperText />
              </FormHelperText>
            )}
          </div>
          <div className="signup-textfield">
            <TextField
              classes={useStyles()}
              error={!valid.validConfirmPassword}
              size="small"
              fullWidth
              type="password"
              variant="outlined"
              placeholder="???????????? ??????"
              name="confirmPassword"
              onChange={e => {
                onChange(e)
                checkPwValidation(e)
              }}
              value={confirmPassword}
              autoComplete="off"
            />
            {valid.validConfirmPassword ? (
              <FormHelperText sx={{ color: 'green' }}>
                <CheckPwHelperText />
              </FormHelperText>
            ) : (
              <FormHelperText sx={{ color: 'red' }}>
                <CheckPwHelperText />
              </FormHelperText>
            )}
          </div>
          {/* <hr className="signup-line" /> */}
          {signupButton()}
          <div className="login-text">
            <span>?????? ????????? ???????????????? &nbsp;</span>
            <a className="text-go" href="/">
              ????????? ????????????
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp
