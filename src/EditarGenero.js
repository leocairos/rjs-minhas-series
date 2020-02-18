import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditarGenero = ( {match} ) => {

    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        axios
            .get('/api/genres/' + match.params.id)
            .then( res => {
                setName(res.data.name)
            })
    }, [match.params.id])

    const onChange = evt => {
        setName(evt.target.value)
    }

    const save = () => {
        axios
            .put('/api/genres/' + match.params.id, {
                name
            })
            .then(res => {
                setSuccess(true)
            })
    }

    if (success) {
        return <Redirect to='/generos' />
    }

    return (
        <div className='container'>
            <h1>Editar Genêro</h1>
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

export default EditarGenero