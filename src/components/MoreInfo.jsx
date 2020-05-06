import React, { Fragment } from 'react';


const MoreInfo = (props) => {
  console.log(props)
  // { (props.coin.tags.length === 0) ? "null" : <p>{props.coin.tags}</p> }
  return (
    <div>
      <p>In circulation: {props.coin.total_supply}</p>
      <p>Price change (1 hour): {props.coin.quote.USD.percent_change_1h.toFixed(2)}%</p>
      <p>Price change (7 Days): {props.coin.quote.USD.percent_change_7d.toFixed(2)}%</p>
      <p>Value rank: {props.coin.cmc_rank}</p>
    </div>
  );
}

export default MoreInfo;