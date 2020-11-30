
import React, {useState} from 'react'
import { useCookies } from 'react-cookie';

export const Context = React.createContext();

export default ({
  children
}) => {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const [oauth, setOauth] = useState(cookies.oauth)
  return (
    <Context.Provider value={{
      oauth: oauth,
      setOauth: (oauth) => {
        if(oauth){
          const payload = JSON.parse(
            Buffer.from(
              oauth.id_token.split('.')[1], 'base64'
            ).toString('utf-8')
          )
          oauth.email = payload.email
          setCookie('oauth', oauth)
        }else{
          removeCookie('oauth')
        }
        setOauth(oauth)
      },
    }}>{children}</Context.Provider>
  )
}