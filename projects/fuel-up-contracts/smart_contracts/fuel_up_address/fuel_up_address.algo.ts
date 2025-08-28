import {
  Account,
  contract,
  Contract,
  err,
  GlobalState,
  LocalState,
  abimethod,
  BoxMap,
  Box,
  op,
} from "@algorandfoundation/algorand-typescript";
import { StaticArray, UintN64 } from "@algorandfoundation/algorand-typescript/arc4/encoded-types";
import { DonationRecord, TokenPrice, TotalDonationsByDay } from "./config.algo";

@contract({ name: "fuel-up-address", avmVersion: 11 })
export class FuelUpAddress extends Contract {
  account_to_fund = GlobalState<Account>();

  admin_account = GlobalState<Account>();

  fuel_amount_usd = GlobalState<UintN64>();

  fuel_reward_amount = GlobalState<UintN64>();

  fuel_up_per_day = GlobalState<UintN64>();

  oracle_app_id = GlobalState<UintN64>();

  donation_records = Box<StaticArray<DonationRecord, 10000>>({ key: "dr" });

  total_donations_by_day = Box<StaticArray<TotalDonationsByDay, 10000>>({ key: "tdbd" });

  // local state
  last_day = LocalState<UintN64>();

  day_count = LocalState<UintN64>();

  total_count = LocalState<UintN64>();

  @abimethod({ allowActions: "NoOp", onCreate: "require" })
  public createApplication(admin: Account): void {
    this.admin_account.value = admin;
  }

  public initApplication(
    accountToFund: Account,
    fuelAmountUsd: UintN64,
    fuelRewardAmount: UintN64,
    fuelUpPerDay: UintN64,
    oracleAppId: UintN64
  ): void {
    this.account_to_fund.value = accountToFund;
    this.fuel_amount_usd.value = fuelAmountUsd;
    this.fuel_reward_amount.value = fuelRewardAmount;
    this.fuel_up_per_day.value = fuelUpPerDay;
    this.oracle_app_id.value = oracleAppId;
    this.donation_records.create();
    this.total_donations_by_day.create();
  }

  public optIn(): void {
    this.last_day(op.Txn.sender).value = new UintN64(0);
    this.day_count(op.Txn.sender).value = new UintN64(0);
    this.total_count(op.Txn.sender).value = new UintN64(0);
  }
}
export abstract class PriceOracleStub extends Contract {
  @abimethod({ allowActions: "NoOp" })
  getTokenPrice(assetId: UintN64): TokenPrice {
    err("stub only");
  }
}
