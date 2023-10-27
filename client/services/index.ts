'use server'
import { cardData } from '@/data/cardItems'
import { categories } from '@/data/categoryItems'
import { auctionData } from '@/data/auctionItems'
import { GET_COLLECTIONS, GET_AUCTIONS } from './queries'

type TFetchQueryArgs = {
    path?: string;
     headers?: {[key: string]: string};
     query: string;
}


async function fetchQuery({path = 'http://localhost:3001/graphql', headers, query}:TFetchQueryArgs ):Promise<any> {
    const response =  await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*', ...headers },
        body: JSON.stringify({ query }),
    })
    return await response.json()
}

export async function getCollections() {  
    'use server'
    const { data } = await fetchQuery({ query: GET_COLLECTIONS });

    await new Promise((resolve) => setTimeout(resolve, 2000))

    // before BE will be ready
    return { data: cardData }
}


export async function getCategories() {
    'use serve'
    //  Waiting for BE 
    // const { data } = fetchQuery({ query: GET_CATEGORIES });

    await new Promise((resolve) => setTimeout(resolve, 2000))
    return { data: categories }
}

export async function getAuctions() {
    'ue server'
    const { data } = await fetchQuery({ query: GET_AUCTIONS });

    await new Promise((resolve) => setTimeout(resolve, 2000))

    return { data: auctionData}
}