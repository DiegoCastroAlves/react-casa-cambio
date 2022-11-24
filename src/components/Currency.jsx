import Coin from '../coin-logo.svg';
export const Currency = ({ currency, value }) => {
  const replaceToComma = value.replace('.', ',');
  const valuePattern = replaceToComma.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  return (
    <div className='currency'>
      <p className='currency-name'>
        <img className='currency-icon' src={Coin} alt={currency} />
        {currency}
      </p>
      <p className='currency-value'>{valuePattern}</p>
    </div>
  );
};
