import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CoinInfo = props => {
  const [info, setInfo] = useState({ data: [] })

  const getData = async () => {
    const resp = await axios.get(
      // `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=76b58b26-5c6a-46d7-84e9-de18c7e824bd`
      `https://api.allorigins.win/get?url=https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=76b58b26-5c6a-46d7-84e9-de18c7e824bd`
    )
    const json = JSON.parse(resp.data.contents)
    setInfo(json)
    console.log(json)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="coins">
      <h2>Cryptocurrency Information</h2>
      {info.data.map(coin => {
        const round = coin.quote.USD.price.toFixed(2)
        const roundper = coin.quote.USD.percent_change_24h.toFixed(2)
        return (
          <>
            <div className="center-align card-panel hoverable">
              <span>{coin.name}</span>
              <span className="coin-name">
                {coin.symbol} {':'} &nbsp;
            </span>
              <span className="price">
                {'$'}
                {round} &nbsp;
            </span>
              <span className="percent">{roundper}%</span>
              {/* <span className="name">({coin.name})</span> */}
            </div>
          </>
        )
      })}
    </div>
  )
}
export default CoinInfo
