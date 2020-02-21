import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {

    const [form, setForm] = useState({
        name: ''
    })
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('INFO')

    const [data, setData] = useState({})
    const [genres, setGenres] = useState([])

    useEffect(() => {
        axios
            .get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)

            })
    }, [match.params.id])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)                
            })
    }, [data])

    // custon header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {
        axios
            .put('/api/series/' + match.params.id, form)
            .then(res => {
                setSuccess(true)
            })
    }

    if (success) {
        return <Redirect to='/series' />
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-9'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                                    {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
                                    Gênero: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {
                mode === 'INFO' &&
                <div className='container'>
                    <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
                </div>
            }
            {
                mode === 'EDIT' &&
                <div className='container'>
                    <h1>
                        {mode === 'INFO' && 'Informações da '}
                        {mode === 'EDIT' && 'Editar '}
                        Série
                     </h1>                    
                    <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar edição</button>
                    <Form>
                        <FormGroup>
                            <Label htmlFor='name'>Nome da Série</Label>
                            <Input type='text' value={form.name} onChange={onChange('name')}
                                className='form-control' id='name' placeholder='Nome da Série' />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='comments'>Comentários</Label>
                            <Input type='text' value={form.comments} onChange={onChange('comments')}
                                className='form-control' id='comments' placeholder='Comentários da Série' />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='genre'>Gênero</Label>
                            <select className='form-control' onChange={onChange('genre_id')} value={form.genre_id}>
                                {genres.map(genre =>
                                    <option key={genre.id} value={genre.id} selected={genre.id === form.genre_id}>
                                        {genre.name}
                                    </option>
                                )}
                            </select>
                        </FormGroup>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status'
                                checked={form.status === 'ASSISTIDO'}
                                value='ASSISTIDO' id='assistido' onChange={seleciona('ASSISTIDO')} />
                            <label className='form-check-label' htmlFor='assistido'>
                                Assistido
                            </label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status'
                                checked={form.status === 'PARA_ASSISTIR'}
                                value='PARA_ASSISTIR' id='paraAssistir' onChange={seleciona('PARA_ASSISTIR')} />
                            <label className='form-check-label' htmlFor='paraAssistir'>
                                Para assistir
                            </label>
                        </div>
                        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                    </Form>
                </div>
            }
        </div>
    )
}

export default InfoSerie