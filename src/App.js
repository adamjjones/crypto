import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CoinInfo from './components/CoinInfo'
import MoreInfo from './components/MoreInfo'

const App = props => {

  const [info, setInfo] = useState([])

  const getData = async () => {
    console.log(props)
    const resp = await axios.get(
      // `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=76b58b26-5c6a-46d7-84e9-de18c7e824bd`
      `https://api.allorigins.win/get?url=https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=76b58b26-5c6a-46d7-84e9-de18c7e824bd`
    )
    const contents = JSON.parse(resp.data.contents)
    setInfo(contents.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <CoinInfo info={info} />
      <Router>
        <Switch>
          <Route exact component={MoreInfo} path="/MoreInfo" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
