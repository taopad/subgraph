import { getSnapshot } from "./lib/graphql"
import { getFinalizedBlock, getHolderInfo } from "./lib/blockchain"

const verify = async () => {
    const block = await getFinalizedBlock()
    const snapshot = await getSnapshot(block.number)

    for (const holder of snapshot) {
        console.log(holder.address)

        const { balance, isBlacklisted } = await getHolderInfo(block.number, holder.address)

        if (balance !== holder.balance || isBlacklisted != holder.isBlacklisted) {
            console.log({ balance, isBlacklisted })
            console.log(holder)
            throw new Error()
        }
    }
}

verify()
