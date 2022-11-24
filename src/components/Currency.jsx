import Coin from '../coin-logo.svg';
export const Currency = ({ currency, value }) => {
  return (
    <div className='currency'>
      <p className='currency-name'>
        <img className='currency-icon' src={Coin} alt={currency} />
        {currency}
      </p>
      <p className='currency-value'>{value}</p>
    </div>
  );
};
