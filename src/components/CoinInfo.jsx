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
    console.log(json)
    setInfo(json)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="coins" key="coin">
      <h3>Cryptocurrency Information</h3>
      <div className="content">
        {info.data.map((coin, idx) => {
          const round = coin.quote.USD.price.toFixed(2)
          const roundper = coin.quote.USD.percent_change_24h.toFixed(2)
          return (
            <div className="col xs12 m6" key={idx}>
              <div className="card darken-1">
                <div className="card-content white-text">
                  <span>Coin Name: {coin.name}</span>
                  <span className="coin-name">
                    Coin Symbol: {coin.symbol}
                  </span>
                  <span className="price">
                    Price per unit: {'$'}
                    {round}
                  </span>
                  <span className="percent">24 Hours percentage change: {roundper}%</span>
                </div>
                <div className="card-action">
                  <a href="#">More Info</a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div >
  )
}
export default CoinInfo
