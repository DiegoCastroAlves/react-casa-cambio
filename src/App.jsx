import { useState } from 'react';
import './App.css';
import { Currency } from './components/Currency';
import Swal from 'sweetalert2';

function App() {
  const [currency, setCurrency] = useState('');
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
    const url = `https://api.exchangerate.host/latest?base=${currency}`;

    if (currency === '') {
      errorMessages('Campo vazio!');
    } else {
      fetch(url)
        .then((response) => response.json())
        .then(({ rates }) => {
          if (!Object.keys(rates).includes(currency)) {
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
            value={currency}
            onChange={(e) => {
              // remove all non-alphanumeric characters
              const value = e.target.value.replace(/[^a-zA-Z]/g, '');
              setCurrency(value.toUpperCase());
            }}
          />

          <button type='submit'>Pesquisar</button>
        </div>
      </form>

      <section className='currency-displayer'>
        {Object.keys(allCurrency).map((currency) => {
          return (
            <Currency
              key={currency}
              currency={currency}
              value={allCurrency[currency].toFixed(2)}
            />
          );
        })}
      </section>
    </main>
  );
}

export default App;
