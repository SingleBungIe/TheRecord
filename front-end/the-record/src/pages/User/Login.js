import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import fetchLogin from './service'
import store from '../../store'
import { types } from '../../actions/common'
import loginLogo from '../../assets/login_logo.svg'
import googleIcon from '../../assets/google_icon.svg'

function Login() {
  const navigate = useNavigate()

  const [account, setAccount] = useState({
    id: '',
    password: '',
  })

  const onChangeAccount = e => {
    setAccount({ ...account, [e.target.name]: e.target.value })
  }

  const onSubmitAccount = async () => {
    try {
      const JWT = await fetchLogin(account)

      const decodeJWT = jwtDecode(JWT)
      const userInfo = {
        userPk: decodeJWT.userPk,
        userId: decodeJWT.userId,
      }
      sessionStorage.setItem('jwt', JWT)
      store.dispatch({
        type: types.FETCH_USER_INFO,
        userInfo,
        key: 'loginUserInfo',
      })
      store.dispatch({
        type: types.FETCH_USER_INFO,
        userInfo,
        key: 'homePageHostInfo',
      })

      if (store.getState().common.homePageHostInfo) {
        navigate('/home')
      } else {
        setTimeout(() => {
          navigate('/home')
        }, 300)
      }
    } catch (error) {
      alert('로그인 정보가 일치하지 않습니다')
    }
  }

  return (
    <Container>
      <Container2>
        <img
          src={loginLogo}
          style={{ width: '340px', marginBottom: 40 }}
          alt="로고"
        />
        <DivStyle>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '45px',
              paddingLeft: '10px',
              paddingRight: '35px',
              width: '400px',
            }}
          >
            <Input
              id="id"
              name="id"
              placeholder="아이디"
              onChange={onChangeAccount}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  onSubmitAccount()
                }
              }}
            />
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호"
              onChange={onChangeAccount}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  onSubmitAccount()
                }
              }}
            />
          </div>
          <div
            style={{
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LoginButton onClick={() => onSubmitAccount()}>로그인</LoginButton>
          </div>
        </DivStyle>
        <DivStyle2>
          <hr
            style={{
              width: '290px',
              height: '1.5px',
              border: 'none',
              backgroundColor: 'black',
            }}
          />
          <OrDiv>또는</OrDiv>
          <hr
            style={{
              width: '290px',
              height: '1.5px',
              border: 'none',
              backgroundColor: 'black',
            }}
          />
        </DivStyle2>
        <GoogleLoginButton onClick={() => alert('준비중인 기능입니다.')}>
          <img src={googleIcon} style={{ width: 40 }} alt="구글아이콘" />
          구글 로그인
        </GoogleLoginButton>
        <JoinText>
          아직 계정이 없으신가요?{' '}
          <Join onClick={() => navigate('signup')}>가입하기</Join>
        </JoinText>
      </Container2>
    </Container>
  )
}

export default Login

/* CSS */
const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Container2 = styled.div`
  width: 55%;
  max-width: 1200px;
  min-width: 1000px;
  height: 60%;
  max-height: 700px;
  min-height: 600px;
  background-color: #ffffff;
  border: solid 1px #dadada;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  height: 45px;
  padding: 20px;
  margin-bottom: 20px;
  font-family: 'dunggeunmo';
  font-size: 15px;
  border: solid 2px #dadada;
  background: #fff;
  border-radius: 10px;
  &:focus {
    border: none;
    outline: 2px solid rgba(75, 182, 209, 0.87);
  }
`
const DivStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 190px;
`

const DivStyle2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 18px;
`

const LoginButton = styled.button`
  font-size: 21px;
  margin-bottom: 10px;

  width: 150px;
  height: 135px;

  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  background-color: rgba(75, 182, 209, 0.87);
  border-radius: 15px;
  font-family: 'dunggeunmo';
`
const GoogleLoginButton = styled.button`
  display: block;
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 20px;
  width: 360px;
  height: 65px;

  cursor: pointer;
  color: #fff;
  border: none;
  background-color: rgba(75, 182, 209, 0.87);
  border-radius: 15px;
  font-family: 'dunggeunmo';
  display: flex;
  justify-content: center;
  align-items: center;
`

const OrDiv = styled.div`
  text-align: center;
  margin: 0 15px;
`

const JoinText = styled.div`
  text-align: center;
  font-size: 15px;
`

const Join = styled.a`
  color: rgba(75, 182, 209, 0.87);
  text-decoration: none;
  cursor: pointer;
`
