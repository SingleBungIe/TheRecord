const fetchLogin = async ({ id, password }) => {
  const data = { userId: id, password }
  return fetch('https://the-record.co.kr/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(async res => {
      const loginStatus = res.status
      const JWT = await res.text()
      if (loginStatus === 200) return JWT
      throw new Error('아이디와 비밀번호를 확인해주세요.')
    })
    .catch(() => {
      throw new Error('네트워크에 이상이 있거나 존재하지 않는 사이트입니다.')
    })
}
export default fetchLogin
