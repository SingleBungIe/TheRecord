/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate, useLocation } from 'react-router-dom'

const withRouter = Component => {
  function Wrapper(props) {
    const navigate = useNavigate()
    const location = useLocation()

    return <Component navigate={navigate} location={location} {...props} />
  }

  return Wrapper
}

export default withRouter
