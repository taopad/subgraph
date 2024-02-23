import { graphql } from "./lib/graphql"
import { getLastFinalizedBlock, getHolderInfo } from "./lib/blockchain"

const parseMinBalanceInput = () => {
    if (process.argv.length < 3) {
        return 0n
    }

    try {
        return BigInt(process.argv[2])
    } catch (e: any) {
        throw new Error("min_balance must be parsable as bigint")
    }
}

const snapshot = async () => {
    const minBalance = parseMinBalanceInput()

    const block = await getLastFinalizedBlock()
    const snapshot = await graphql.snapshot(block.number, minBalance)

    console.log(block.number)

    for (const holder of snapshot) {
        console.log(holder.address)

        const { balance, isBlacklisted } = await getHolderInfo(block.number, holder.address)

        console.log({ balance, isBlacklisted })
        console.log(holder)

        if (balance !== holder.balance || isBlacklisted != holder.isBlacklisted) {
            throw new Error("mismatch")
        }
    }
}

snapshot()
