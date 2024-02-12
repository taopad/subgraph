import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddToBlacklist,
  Approval,
  Claim,
  Distribute,
  OptIn,
  OptOut,
  OwnershipTransferred,
  RemoveFromBlacklist,
  Sweep,
  Transfer
} from "../generated/Taopad/Taopad"

export function createAddToBlacklistEvent(addr: Address): AddToBlacklist {
  let addToBlacklistEvent = changetype<AddToBlacklist>(newMockEvent())

  addToBlacklistEvent.parameters = new Array()

  addToBlacklistEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )

  return addToBlacklistEvent
}

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createClaimEvent(
  addr: Address,
  to: Address,
  amount: BigInt
): Claim {
  let claimEvent = changetype<Claim>(newMockEvent())

  claimEvent.parameters = new Array()

  claimEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  claimEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  claimEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return claimEvent
}

export function createDistributeEvent(
  addr: Address,
  amount: BigInt
): Distribute {
  let distributeEvent = changetype<Distribute>(newMockEvent())

  distributeEvent.parameters = new Array()

  distributeEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  distributeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return distributeEvent
}

export function createOptInEvent(addr: Address): OptIn {
  let optInEvent = changetype<OptIn>(newMockEvent())

  optInEvent.parameters = new Array()

  optInEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )

  return optInEvent
}

export function createOptOutEvent(addr: Address): OptOut {
  let optOutEvent = changetype<OptOut>(newMockEvent())

  optOutEvent.parameters = new Array()

  optOutEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )

  return optOutEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRemoveFromBlacklistEvent(
  addr: Address
): RemoveFromBlacklist {
  let removeFromBlacklistEvent = changetype<RemoveFromBlacklist>(newMockEvent())

  removeFromBlacklistEvent.parameters = new Array()

  removeFromBlacklistEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )

  return removeFromBlacklistEvent
}

export function createSweepEvent(
  addr: Address,
  token: Address,
  amount: BigInt
): Sweep {
  let sweepEvent = changetype<Sweep>(newMockEvent())

  sweepEvent.parameters = new Array()

  sweepEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  sweepEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  sweepEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return sweepEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
