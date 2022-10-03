import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import './Form.css'

const Form = () => {
    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [entity, setEntity] = useState('physical')
    const { tg } = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send data'
        })
    }, [])

    useEffect(() => {
        if(!street || !country){
            tg.MainButton.hide()
        } else{
            tg.MainButton.show()
        }
    }, [country,street]);


    const onChangeCountry = e => {
        setCountry(e.target.value)
    }
    const onChangeStreet = e => {
        setStreet(e.target.value)
    }
    const onChangeEntity = e => {
        setEntity(e.target.value)
    }
    return (
        <div className={'form'}>
            <h3>Input your data</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Country'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Street'}
                value={street}
                onChange={onChangeStreet}
            />
            <select value={entity} onChange={onChangeEntity} className={'select'}>
                <option value={'physical'}>Physical Entity</option>
                <option value={'lega'}>Legal Entity</option>
            </select>
        </div>
    )
}

export default Form