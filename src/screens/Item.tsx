import React, { useEffect } from 'react'

const Item:React.FC = () => {

    useEffect(() => {
        console.log('Item screen')
    }, [])

    return (
        <>
            Item
        </>
    )
}

export default Item