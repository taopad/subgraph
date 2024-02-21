import { request, gql } from 'graphql-request'

type StoredSnapshotItem = {
    id: string
    address: string
    balance: string
    isBlacklisted: boolean
}

const endpoint = "https://api.studio.thegraph.com/query/63743/taopad/version/latest"

const snapshot = (blockNumber: bigint) => gql`
    {
        holders(block: {number: ${blockNumber}}) {
            id
            address
            balance
            isBlacklisted
        }
    }
`

export const getSnapshot = async (blockNumber: bigint) => {
    const result: { holders: StoredSnapshotItem[] } = await request(endpoint, snapshot(blockNumber))

    return result.holders.map(({ id, address, balance, isBlacklisted }) => ({
        id,
        address: address as `0x${string}`,
        balance: BigInt(balance),
        isBlacklisted,
    }))
}
