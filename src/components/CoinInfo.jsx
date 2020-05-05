import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import MoreInfo from "./MoreInfo"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const CoinInfo = props => {

  const More = () => {
    return <MoreInfo more={props} />
  }

  return (
    <div className="coins" key="coin">
      <Fragment>

        <h3>Cryptocurrency Information</h3>
        <div className="content">
          {props.info.map((coin, idx) => {
            const round = coin.quote.USD.price.toFixed(2)
            const roundper = coin.quote.USD.percent_change_24h.toFixed(2)
            const moreInfoUrl = `/MoreInfo/${coin.id}/`
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
                  <Router>
                    <Switch>
                      <Route path={moreInfoUrl} exact>
                        <MoreInfo {...props} />
                      </Route>
                    </Switch>
                    {/* <Route path="/CoinInfo" component={CoinInfo} /> */}
                    <div className="card-action">
                      <Link to={moreInfoUrl}>More Info</Link>
                      {/* <Link to="/CoinInfo">Refresh</Link> */}
                    </div>
                  </Router>
                </div>
              </div>
            )
          })}
        </div>
      </Fragment >
    </div >
  )
}
export default CoinInfo
