import axios from 'axios'

// First argument endpoint url, second argument is object data if we send in the body, third argument is object data we send in the headers
export const createOrUpdateUser = async authtoken => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
}
