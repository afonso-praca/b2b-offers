import React, { useState } from 'react'
import type { FC } from 'react'
import { Alert, Button, Card, PageHeader, Table, Input } from 'vtex.styleguide'
import { addToCart, setManualPrice } from 'vtex.checkout-resources/Mutations'
import { useMutation } from 'react-apollo'
import { usePixel } from 'vtex.pixel-manager/PixelContext'
import { OrderForm } from 'vtex.order-manager'

//import { ItemInput } from 'vtex.checkout-graphql'

const B2BOffersPage: FC = () => {

    const [orderQuantity, setOrderQuantity] = useState({});
    const [addItems] = useMutation(addToCart)
    const [setPrice] = useMutation(setManualPrice)
    const { push } = usePixel()

    const { setOrderForm }: any = OrderForm.useOrderForm()

    const handleAddToCart = async (offerId: string, orderQuantity: any, data: any) => {
        const items: any[] = [];
        const orderQuantityKeys: string[] = Object.keys(orderQuantity);

        orderQuantityKeys.forEach((qtdKey: string, index) => {
            if (qtdKey.startsWith(offerId + "-")) {
                const skuId: string = qtdKey.split("-")[1]
                const quantity = orderQuantity[qtdKey]
                const offer = data.find((item: any) => item.offerId === offerId)
                const skuData = offer.items.find((item: any) => item.skuId === skuId)

                console.log("skuId", skuId)
                console.log("quantity", quantity)
                console.log("offer", offer)
                console.log("skuData", skuData)

                items.push({
                    id: parseInt(skuId),
                    quantity: parseInt(quantity),
                    seller: skuData.sellerId,
                    price: skuData.price,
                    index,
                })
            }
        })

        console.log("items", items)
        await addItems({
            variables: {
                items: items.map((sku) => {
                    return {
                        id: sku.id,
                        quantity: sku.quantity,
                        seller: sku.seller,
                        index: sku.index,
                    }
                }),
                salesChannel: data.salesChannel
            }
        })

        let setPriceResult: any = {}

        for (let i = 0; i < items.length; i++) {
            console.log("passou no for")
            setPriceResult = await setPrice({
                variables: {
                    manualPriceInput: {
                        itemIndex: items[i].index,
                        price: parseInt(items[i].price)
                    }
                }
            })
        }

        // Update OrderForm from the context
        setPriceResult.data && setOrderForm(setPriceResult.data.setManualPrice)

        const adjustSkuItemForPixelEvent = (item: any) => {
            return {
                skuId: item.id,
                quantity: item.quantity,
            }
        }

        const pixelEventItems = items.map(adjustSkuItemForPixelEvent)

        console.log("pixelEventItems", pixelEventItems)

        push({
            event: 'addToCart',
            items: pixelEventItems,
        })

    }

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
                    const key = rowData.offerId + '-' + rowData.skuId
                    return (
                        <Input
                            placeholder="Quantity"
                            size="small"
                            onChange={(e: any) => {
                                (orderQuantity as any)[key] = e.target.value
                                setOrderQuantity(orderQuantity)
                            }}
                        />
                    )
                },
            }
        },
    }

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
                        <Button
                            type="number"
                            variation="secondary"
                            onClick={() => handleAddToCart(d.offerId, orderQuantity, data)}
                            id={d.offerId}>
                            Overwrite Your Cart
                        </Button>
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
                price: "5000",
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
                price: "4500",
                minQuantity: 10,
                maxQuantity: 100,
                offerId: "321",
            }
        ]
    }
]