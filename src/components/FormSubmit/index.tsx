import { FormEvent, SetStateAction, useEffect, useState } from "react";
import { Container, Form, FormContainer, FormContent, SubmitButton } from "./styles";
import Select from 'react-select';
import { Input } from "../Input";

export function FormSubmit() {
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
        let aux: Array<{ value: string, label: string }> = [];

        result = await fetch('https://amazon-api.sellead.com/country')
            .then(response => response.json())
            .then(body => {
                return body
            })

        result.map((country: { name_ptbr: string; }) => {
            aux.push({ 'value': country.name_ptbr, 'label': country.name_ptbr })
        })
        return setCountries(aux);
    }

    async function getCities() {
        let result;
        let aux: Array<{ value: string, label: string }> = [];

        result = await fetch('https://amazon-api.sellead.com/city')
            .then(response => response.json())
            .then(body => {
                return body
            })

        result.map((city: { name_ptbr: string; }) => {
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
        getCountries();
        getCities();
    }, [])
    return (

        <Container>
            <Form onSubmit={Notify}>
                <FormContainer>
                    <FormContent>
                        <h3>Dados Pessoais</h3>
                        <Input
                            label="Nome"
                            name="name"
                        />
                        <Input
                            label="Email"
                            name="email"
                        />

                        <Input
                            label="Telefone"
                            name="phone"
                            type="number"
                        />

                        <Input
                            label="CPF"
                            name="cpf"
                            type="number"
                        />
                    </FormContent>

                    <FormContent>
                        <h3>Destinos de Interesse</h3>
                        <Select
                            placeholder="Selecione o(s) país(es)"
                            className="select"
                            isMulti
                            options={countries}
                            onChange={handleSelectedCountriesChange}
                        />
                        <Select
                            placeholder="Selecione a(s) cidade(s)"
                            className="select"
                            isMulti
                            options={cities}
                            onChange={handleSelectedCitiesChange}
                        />
                    </FormContent>

                </FormContainer>
                <SubmitButton>Enviar</SubmitButton>
            </Form>
        </Container>
    )
}