import { FormEvent, SetStateAction, useEffect, useState } from "react";
import { Container, Form, FormContainer, FormContent, SubmitButton } from "./styles";
import Select from 'react-select';
import { Input } from "../Input";
import * as yup from 'yup';

type OptionType = {
    value: string;
    label: string;
};

export function FormSubmit() {
    const [countries, setCountries] = useState<Array<{ value: string, label: string }>>([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [cities, setCities] = useState<Array<{ value: string, label: string }>>([]);
    const [selectedCities, setSelectedCities] = useState<Array<{ value: string, label: string }>>([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');


    const dateSchema = yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.number().required(),
        cpf: yup.string().min(11).max(11).required(),
        // countries: yup.number().test(((value) => value != 0)).required()
        //     yup.number().required()
        // ,
        // cities: yup.number().required()
    });

    async function Notify(event: FormEvent) {
        event.preventDefault();

        let listCountries: string[] = [];
        await selectedCountries.map((countries: { value: string }) => {
            return listCountries.push(countries.value);
        })

        let listCities: string[] = [];

        await selectedCities.map((city: { value: string }) => {
            return listCities.push(city.value);
        })

        dateSchema.isValid(
            {
                nome,
                email,
                phone,
                cpf,
            }
        ).then(valid => {
            if (valid != true || listCities.length === 0 || listCountries.length === 0) {
                alert(`Por favor preencha todos os campos.`)
            } else {
                alert(`Dados enviados com sucesso!
                            Nome: ${nome}
                            E-mail: ${email}
                            Telefone: ${phone}
                            CPF: ${cpf}
                            Países selecionados: ${listCountries}
                            Cidades selecionadas: ${listCities}`
                )
            }
        });



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

    function handleCpfChange(event: string) {
        let formatCpf = String(event.replace(/\D/g, ''))
        return setCpf(formatCpf)
    }

    function handleSelectedCountriesChange(selectedOption: any) {
        setSelectedCountries(selectedOption)
    }
    function handleSelectedCitiesChange(selectedOption: any) {
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
                            value={nome}
                            onChange={(event) => setNome(event.target.value)}
                        />
                        <Input
                            label="Email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <Input
                            label="Telefone"
                            name="phone"
                            type="number"
                            value={phone}
                            min={11}
                            onChange={(event) => setPhone(event.target.value)}
                        />

                        <Input
                            label="CPF"
                            name="cpf"
                            type="text"
                            value={cpf}
                            minLength={11}
                            maxLength={11}
                            onChange={(event) => handleCpfChange(event.target.value)}
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