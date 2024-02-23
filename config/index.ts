import "dotenv/config"

if (process.env.RPC_URL === undefined) {
    throw new Error("process.env.RPC_URL is required")
}

if (process.env.SUBGRAPH_URL === undefined) {
    throw new Error("process.env.SUBGRAPH_URL is required")
}

export const rpc = {
    url: process.env.RPC_URL,
}

export const subgraph = {
    url: process.env.SUBGRAPH_URL,
}
