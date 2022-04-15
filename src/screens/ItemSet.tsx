import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ItemSet:React.FC = () => {

    const { id } = useParams()
    console.log('id', id)

    useEffect(() => {
        console.log('ItemSet screen')
    }, [])

    return (
        <>
            ItemSet
        </>
    )
}

export default ItemSet