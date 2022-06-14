import React, { useState } from 'react'
import type { FC } from 'react'
import { Alert, Button, Card, PageHeader, Table, Input } from 'vtex.styleguide'

const B2BOffersPage: FC = () => {

    const customSchema = {
        properties: {
            skuId: {
                title: 'SKU Id',
                width: 250,
            },
            name: {
                title: 'Name',
                width: 600,
            },
            price: {
                title: 'Price',
                width: 100,
            },
            quantity: {
                title: 'Quantity',
                cellRenderer: ({ cellData, rowData }: any) => {
                    console.log("cell data = ", cellData)
                    console.log("row data = ", rowData)
                    console.log("order qtd = ", orderQuantity)

                    const key = rowData.offerId + '-' + rowData.skuId
                    const obj: any = {}

                    return (
                        <Input
                            placeholder="Quantity"
                            size="small"
                            onChange={(e: any) => {
                                obj[key] = e.target.value
                                setOrderQuantity(obj)
                            }}
                        />
                    )
                },
            }
        },
    }

    const [orderQuantity, setOrderQuantity] = useState({});


    console.log(data)


    return (
        <div>
            <PageHeader title="B2B Offers" />
            <Alert type="warning">
                POC only. Not production ready
            </Alert>
            <br />
            {data.map((d, index) => (
                <div>
                    <Card key={index}>
                        <h3>{d.name}</h3>
                        <p>
                            <Table
                                schema={customSchema}
                                items={d.items}
                            />
                        </p>
                        <Button variation="primary">Add To Cart</Button>
                    </Card>
                    <br />
                </div>
            ))}

        </div>
    )
}

export default B2BOffersPage

const data = [
    {
        name: "Mats Offers",
        offerId: "123",
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
                maxQuantity: 100,
                offerId: "123",

            },
            {
                skuId: "10001517",
                imageUrl: "http://kevinyee.vteximg.com.br/arquivos/ids/156396-55-55/FSC-blue-a.png?v=637891376638330000",
                sellerId: "1",
                name: "The (Big) Mat Made With FSC-Certified Rubber",
                listPrice: "11160",
                price: "6500",
                minQuantity: 10,
                maxQuantity: 100,
                offerId: "123",
            }
        ]
    },
    {
        name: "Mats Offers 2",
        offerId: "321",
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
                maxQuantity: 100,
                offerId: "321",
            },
            {
                skuId: "10001517",
                imageUrl: "http://kevinyee.vteximg.com.br/arquivos/ids/156396-55-55/FSC-blue-a.png?v=637891376638330000",
                sellerId: "1",
                name: "The (Big) Mat Made With FSC-Certified Rubber",
                listPrice: "11160",
                price: "6500",
                minQuantity: 10,
                maxQuantity: 100,
                offerId: "321",
            }
        ]
    }
]