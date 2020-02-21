import React, { useState } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovaSerie = () => {

    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    const onChange = evt => {
        setName(evt.target.value)
    }

    const save = () => {
        axios
            .post('/api/series', {
                name
            })
            .then(res => {
                setSuccess(true)
            })
    }

    if (success){
        return <Redirect to='/series' />
    }

    return (
        <div className='container'>
            <h1>Nova Série</h1>
            <Form>
                <FormGroup>
                    <Label for='name'>Nome da Série</Label>
                    <Input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Nome da Série' />
                </FormGroup>
                <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
            </Form>
        </div>
    )
}

export default NovaSerie