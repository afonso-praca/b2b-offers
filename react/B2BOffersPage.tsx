import React from 'react'
import type { FC } from 'react'
import { Card, PageHeader } from 'vtex.styleguide'

const B2BOffersPage: FC = () => {
    return (
        <div>
            <PageHeader title="B2B Offers" />
            {data.map(d => (
                <div>
                    <Card key={d.name}>
                        <h3>{d.name}</h3>
                        <p>
                            It’s all about being ready to grow and reach new levels. Have a solid
                            foundation, modular thinking and flexible essence, and you’re building for
                            scale. We are global but we’re audacious enough to aim for the stars.
                        </p>
                    </Card>
                    <br />
                </div>
            ))}

        </div>
    )
    console.log(data)
}

export default B2BOffersPage

const data = [
    {
        name: "Mats Offers",
        salesChannel: "1",
        items: [
            {
                skuId: "10001520",
                imageUrl: "http://kevinyee.vteximg.com.br/arquivos/ids/156402-55-55/green.png?v=637891400997230000",
                sellerId: "1",
                name: "The Mat 3mm Made With FSC-Certified Rubber",
                listPrice: "7920",
                price: "6000",
                minQuantity: 10,
                maxQuantity: 100
            },
            {
                skuId: "10001517",
                imageUrl: "http://kevinyee.vteximg.com.br/arquivos/ids/156396-55-55/FSC-blue-a.png?v=637891376638330000",
                sellerId: "1",
                name: "The (Big) Mat Made With FSC-Certified Rubber",
                listPrice: "11160",
                price: "6500",
                minQuantity: 10,
                maxQuantity: 100
            }
        ]
    },
    {
        name: "Mats Offers 2",
        salesChannel: "1",
        items: [
            {
                skuId: "10001520",
                imageUrl: "http://kevinyee.vteximg.com.br/arquivos/ids/156402-55-55/green.png?v=637891400997230000",
                sellerId: "1",
                name: "The Mat 3mm Made With FSC-Certified Rubber",
                listPrice: "7920",
                price: "6000",
                minQuantity: 10,
                maxQuantity: 100
            },
            {
                skuId: "10001517",
                imageUrl: "http://kevinyee.vteximg.com.br/arquivos/ids/156396-55-55/FSC-blue-a.png?v=637891376638330000",
                sellerId: "1",
                name: "The (Big) Mat Made With FSC-Certified Rubber",
                listPrice: "11160",
                price: "6500",
                minQuantity: 10,
                maxQuantity: 100
            }
        ]
    }
]