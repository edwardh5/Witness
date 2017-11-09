import { connect } from 'react-redux'
import LogOutButton from './LogOutButton'
import { logoutUser } from './LogOutButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutUserClick: (event) => {
      event.preventDefault();

      dispatch(logoutUser())
    }
  }
}

const LogOutButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOutButton)

export default LogOutButtonContainer
