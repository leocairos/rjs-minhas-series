import React, { useState } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovoGenero = () => {

    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    const onChange = evt => {
        setName(evt.target.value)
    }

    const save = () => {
        axios
            .post('/api/genres', {
                name
            })
            .then(res => {
                setSuccess(true)
            })
    }

    if (success){
        return <Redirect to='/generos' />
    }

    return (
        <div className='container'>
            <h1>Novo Genêro</h1>
            <Form>
                <FormGroup>
                    <Label for='name'>Nome do Genêro</Label>
                    <Input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Nome do Genêro' />
                </FormGroup>
                <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
            </Form>
        </div>
    )
}

export default NovoGenero