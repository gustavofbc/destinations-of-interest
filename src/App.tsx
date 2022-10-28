import { FormEvent, useEffect, useState } from "react"
import Select from 'react-select';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  function Notify(event: FormEvent) {
    event.preventDefault()

    let listCountries = selectedCountries.map(countries => {
      return countries.value;
    })

    let listCities = selectedCities.map(city => {
      return city.value;
    })
    alert(`Dados enviados com sucesso!
      Países selecionados: ${listCountries}
      Cidades selecionadas: ${listCities}`
    )

  }

  async function getCountries() {
    let result;
    let aux = [];

    result = await fetch('https://amazon-api.sellead.com/country')
      .then(response => response.json())
      .then(body => {
        return body
      })

    result.map(country => {
      aux.push({ 'value': country.name_ptbr, 'label': country.name_ptbr })
    })
    return setCountries(aux);
  }

  async function getCities() {
    let result;
    let aux = [];

    result = await fetch('https://amazon-api.sellead.com/city')
      .then(response => response.json())
      .then(body => {
        return body
      })

    result.map(city => {
      aux.push({ 'value': city.name_ptbr, 'label': city.name_ptbr })
    })
    return setCities(aux);
  }

  function handleSelectedCountriesChange(selectedOption) {
    setSelectedCountries(selectedOption)
  }
  function handleSelectedCitiesChange(selectedOption) {
    setSelectedCities(selectedOption)
  }

  useEffect(() => {
    // fetch('https://amazon-api.sellead.com/country')
    //   .then(response => response.json())
    //   .then(body => {
    //     setCountries(body)
    //   })
    getCountries();

    // fetch('https://amazon-api.sellead.com/city')
    //   .then(response => response.json())
    //   .then(body => {
    //     setCities(body)
    //   })
    getCities();
  }, [])

  return (
    <div>
      <form onSubmit={Notify}>
        <div>
          <h3>Dados Pessoais</h3>
          <label htmlFor="name"> Nome
            <input id="name" type="text" />
          </label>

          <label htmlFor="email"> Email
            <input id="email" type="text" />
          </label>

          <label htmlFor="phone"> Telefone
            <input id="phone" type="number" />
          </label>

          <label htmlFor="cpf"> CPF
            <input id="cpf" type="number" />
          </label>
        </div>

        <div>
          <h3>Destinos de Interesse</h3>
          <Select
            isMulti
            options={countries}
            onChange={handleSelectedCountriesChange}
          />
          {/* <select name="" id="" multiple>
            <option value="">país</option>
            {countries.map(country => (
              <option key={country.code} value="">{country.name_ptbr}</option>
            ))}
          </select> */}
          <Select
            isMulti
            options={cities}
            onChange={handleSelectedCitiesChange}
          />

          {/* <select name="" id="">
            <option value="">Cidade</option>
            {cities.map(city => (
              <option key={city.id} value="">{city.name_ptbr}</option>
            ))}
          </select> */}
        </div>
        <button>Enviar</button>
      </form>
    </div>
  )
}

export default App
