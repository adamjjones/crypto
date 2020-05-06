import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CoinInfo from './components/CoinInfo'
import MoreInfo from './components/MoreInfo'
import moment from 'moment'

const App = props => {

  const [coins, setCoins] = useState([])
  const [expanded, setExpanded] = useState([])

  const setCoinExpansion = (id, value) => {
    let ids = expanded.filter((c) => {
      return c !== id
    })
    if (value)
      ids.push(id)
    setExpanded(ids)
  }

  const getCoins = async () => {

    const now = moment().format('YYYYMMDDHH')
    // localStorage.removeItem('coins')

    const localCoins = localStorage.getItem('coins')
    const coinsdate = localStorage.getItem('coinsdate')

    console.log('now', now)
    console.log('coinsdate', coinsdate)
    if (localCoins && coinsdate && coinsdate === now) {
      const json = JSON.parse(localCoins)
      console.log("using cached coin list from localstorage", json)
      setCoins(json.data.contents.data)
      return
    }

    const resp = await axios.get(
      `https://api.allorigins.win/get?url=https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=76b58b26-5c6a-46d7-84e9-de18c7e824bd`
    )
    console.log("coin list NOT cached, fetched from API", resp)
    resp.data.contents = JSON.parse(resp.data.contents)
    setCoins(resp.data.contents.data)
    localStorage.setItem('coins', JSON.stringify(resp))
    localStorage.setItem('coinsdate', now)
  }

  useEffect(() => {
    if (!coins.length)
      getCoins()
  }, [coins])

  console.log('expanded', expanded)
  return (
    <div>
      <CoinInfo coins={coins} expanded={expanded}
        setCoinExpansion={setCoinExpansion} />
      <Router>
        <Switch>
          <Route exact component={MoreInfo}
            path="/MoreInfo" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
