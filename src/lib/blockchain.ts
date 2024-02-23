import { rpc } from "../../config"
import { mainnet } from "viem/chains"
import { createPublicClient, http } from "viem"

const contract = {
    address: "0x5483DC6abDA5F094865120B2D251b5744fc2ECB5" as `0x${string}`,
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "isBlacklisted",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
    ] as const
}

const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(rpc.url)
})

export const getLastFinalizedBlock = () => {
    return publicClient.getBlock({
        blockTag: "finalized",
    })
}

export const getHolderInfo = async (blockNumber: bigint, address: `0x${string}`) => {
    const [balance, isBlacklisted] = await publicClient.multicall({
        blockNumber,
        allowFailure: false,
        contracts: [
            {
                ...contract,
                functionName: "balanceOf",
                args: [address],
            },
            {
                ...contract,
                functionName: "isBlacklisted",
                args: [address],
            },
        ],
    })

    return { balance, isBlacklisted }
}
