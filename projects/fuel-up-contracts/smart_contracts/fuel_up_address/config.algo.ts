import { arc4 } from "@algorandfoundation/algorand-typescript"

export class DonationRecord extends arc4.Struct<{
  address: arc4.Address
  totalCount: arc4.UintN64
}> {}

export class TotalDonationsByDay extends arc4.Struct<{
  day: arc4.UintN64
  totalCount: arc4.UintN64
}> {}

export class TokenPrice extends arc4.Struct<{
  assetId: arc4.UintN64
  price: arc4.UintN64
  lastUpdated: arc4.UintN64
}> {}

export class OracleKey extends arc4.Struct<{
  assetId: arc4.UintN64
}> {}
