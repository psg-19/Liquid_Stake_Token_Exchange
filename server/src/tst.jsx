let req = {
  accountData: [
    {
      account: "AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf",
      nativeBalanceChange: -1000015000,
      tokenBalanceChanges: [],
    },
    {
      account: "2xoWhdsoHRQFJKMRSSKQqu5vpCtWEKax6ZQ5ZZsUhm3Q",
      nativeBalanceChange: 1000000000,
      tokenBalanceChanges: [],
    },
    {
      account: "11111111111111111111111111111111",
      nativeBalanceChange: 0,
      tokenBalanceChanges: [],
    },
    {
      account: "ComputeBudget111111111111111111111111111111",
      nativeBalanceChange: 0,
      tokenBalanceChanges: [],
    },
  ],
  description:
    "AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf transferred 1 SOL to 2xoWhdsoHRQFJKMRSSKQqu5vpCtWEKax6ZQ5ZZsUhm3Q.",
  events: {},
  fee: 15000,
  feePayer: "AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf",
  instructions: [
    {
      accounts: [],
      data: "3DVGviTXKAPH",
      innerInstructions: [],
      programId: "ComputeBudget111111111111111111111111111111",
    },
    {
      accounts: [],
      data: "LKoyXd",
      innerInstructions: [],
      programId: "ComputeBudget111111111111111111111111111111",
    },
    {
      accounts: [
        "AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf",
        "2xoWhdsoHRQFJKMRSSKQqu5vpCtWEKax6ZQ5ZZsUhm3Q",
      ],
      data: "3Bxs3zzLZLuLQEYX",
      innerInstructions: [],
      programId: "11111111111111111111111111111111",
    },
  ],
  nativeTransfers: [
    {
      amount: 1000000000,
      fromUserAccount: "AkJwrYJtXMyWCFksYr9ist8L2iuUgbZDmu4kpMwf3aLf",
      toUserAccount: "2xoWhdsoHRQFJKMRSSKQqu5vpCtWEKax6ZQ5ZZsUhm3Q",
    },
  ],
  signature:
    "2dy1enDy9EwjXkgfYQA5i6JLm39u1Azib28TZzXuH9xAAh9honNfuAe2b1ChBbXWdu86bqd7Vp6tgufN44YhZjzL",
  slot: 348062489,
  source: "SYSTEM_PROGRAM",
  timestamp: 1734608557,
  tokenTransfers: [],
  transactionError: null,
  type: "TRANSFER",
};

//   console.log(req[0].nativeTransfers[0].fromUserAccount)
