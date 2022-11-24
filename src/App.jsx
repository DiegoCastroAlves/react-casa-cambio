import { useState } from 'react';
import './App.css';
import { Currency } from './components/Currency';
import Swal from 'sweetalert2';

function App() {
  const [userCurrency, setUserCurrency] = useState('');
  const [allCurrency, setAllCurrency] = useState({});

  const errorMessages = (error) => {
    Swal.fire({
      icon: 'error',
      title: error,
      text: 'Digite uma moeda!',
      background: '#47474d',
      color: '#e5e7eb',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://api.exchangerate.host/latest?base=${userCurrency}`;

    if (userCurrency === '') {
      errorMessages('Campo vazio!');
    } else {
      fetch(url)
        .then((response) => response.json())
        .then(({ rates }) => {
          if (!Object.keys(rates).includes(userCurrency)) {
            return errorMessages('Moeda não encontrada!');
          }
          setAllCurrency(rates);
        });
    }
  };

  return (
    <main>
      <h1 className='title'>
        Casa de <span>Câmbio</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='currency-input'>Digite a Moeda:</label>
        <div>
          <input
            type='text'
            id='currency-input'
            placeholder='USD'
            autoComplete='off'
            value={userCurrency}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z]/g, '');
              setUserCurrency(value.toUpperCase());
            }}
          />

          <button type='submit'>Pesquisar</button>
        </div>
      </form>

      <section className='currency-displayer'>
        {Object.keys(allCurrency).map((currency) => {
          const sameCurrency = currency === userCurrency;
          return (
            <Currency
              key={currency}
              currency={currency}
              value={allCurrency[currency].toFixed(2)}
              sameCurrency={sameCurrency}
            />
          );
        })}
      </section>
    </main>
  );
}

export default App;
