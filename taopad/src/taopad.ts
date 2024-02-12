import { Holder } from "../generated/schema"
import { AddToBlacklist as AddToBlacklistEvent, Transfer as TransferEvent } from "../generated/Taopad/Taopad"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleAddToBlacklist(event: AddToBlacklistEvent): void {
  let entity = Holder.load(event.params.addr)

  if (entity == null) {
    entity = new Holder(event.params.addr)
    entity.address = event.params.addr
    entity.balance = BigInt.fromI32(0)
  }

  entity.isBlacklisted = true

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entityFrom = Holder.load(event.params.from)

  if (entityFrom == null) {
    entityFrom = new Holder(event.params.from)
    entityFrom.address = event.params.from
    entityFrom.balance = BigInt.fromI32(0)
    entityFrom.isBlacklisted = false
  }

  let entityTo = Holder.load(event.params.to)

  if (entityTo == null) {
    entityTo = new Holder(event.params.to)
    entityTo.address = event.params.to
    entityTo.balance = BigInt.fromI32(0)
    entityTo.isBlacklisted = false
  }

  entityTo.balance = entityTo.balance.plus(event.params.value)

  if (entityFrom.balance.lt(event.params.value)) {
    entityFrom.balance = BigInt.fromI32(0)
  } else {
    entityFrom.balance = entityFrom.balance.minus(event.params.value)
  }

  entityFrom.save()
  entityTo.save()
}
