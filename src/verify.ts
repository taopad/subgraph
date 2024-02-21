import { getSnapshot } from "./lib/graphql"
import { getFinalizedBlock, getHolderInfo } from "./lib/blockchain"

const verify = async () => {
    const block = await getFinalizedBlock()
    const snapshot = await getSnapshot(block.number)

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

verify()
