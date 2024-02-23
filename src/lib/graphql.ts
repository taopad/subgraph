import { subgraph } from "../../config"
import { Client, fetchExchange, gql } from "@urql/core"

type GetHolders = {
    holders: HolderSubgraphItem[]
}

type HolderSubgraphItem = {
    id: string
    address: string
    balance: string
    isBlacklisted: boolean
}

const client = new Client({
    url: subgraph.url,
    exchanges: [fetchExchange],
});

const allQuery = gql(`
    query GetHolders ($blockNumber: Int!, $first: Int!, $skip: Int!) {
        holders(
            block: { number: $blockNumber },
            where: { balance_gt: "0", isBlacklisted: false },
            orderBy: address,
            orderDirection: asc,
            first: $first,
            skip: $skip
        ) {
            id
            address
            balance
            isBlacklisted
        }
    }
`)

const minBalanceQuery = gql(`
    query GetHolders ($blockNumber: Int!, $minBalance: String!, $first: Int!, $skip: Int!) {
        holders(
            block: { number: $blockNumber },
            where: { balance_gte: $minBalance, isBlacklisted: false },
            orderBy: address,
            orderDirection: asc,
            first: $first,
            skip: $skip
        ) {
            id
            address
            balance
            isBlacklisted
        }
    }
`)

const queryHolderSubgraph = async (blockNumber: bigint, minBalance: bigint, first: number, skip: number) => {
    const query = minBalance === 0n ? allQuery : minBalanceQuery

    const results = await client.query<GetHolders>(query, {
        blockNumber: Number(blockNumber),
        minBalance: minBalance.toString(),
        first: first,
        skip: skip,
    })

    if (results.data === undefined) {
        throw new Error("query error")
    }

    return results.data.holders
}

const snapshot = async (blockNumber: bigint, minBalance: bigint) => {
    const items = []
    const first = 1000

    for (let skip = 0; skip <= 20 * first; skip += first) {
        const results = await queryHolderSubgraph(blockNumber, minBalance, first, skip)

        items.push(...results)

        if (results.length < first) {
            return items.map(({ id, address, balance, isBlacklisted }) => ({
                id,
                address: address as `0x${string}`,
                balance: BigInt(balance),
                isBlacklisted,
            }))
        }
    }

    return []
}

export const graphql = { snapshot }
