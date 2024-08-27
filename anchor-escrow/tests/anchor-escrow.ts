import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { AnchorEscrow } from "../target/types/anchor_escrow";
import { getExplorerLink, makeKeypairs } from "@solana-developers/helpers";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountIdempotentInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction
} from "@solana/web3.js";
import { randomBytes } from "crypto";

console.log("Starting the test file...");

// describe("Simple Test", () => {
//   console.log("Inside describe block...");

//   it("should pass", () => {
//     console.log("Inside test case...");
//   });
// });

describe("anchor-escrow", () => {
  console.log("Starting the test...");
  try {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());
    const program = anchor.workspace.AnchorEscrow as Program<AnchorEscrow>;

    // Now we grab the provider to initialize
    // compoments needed for interacting with Solana
    const provider = anchor.getProvider();
    const connection = provider.connection;

    // Initialize the maker, taker, mint A, and mint B accounts
    // using solana helper built in method 
    const [maker, taker, mintA, mintB ] = makeKeypairs(4);

    // // Get the ATA for both mints for both accounts. 
    // // Do this by mapping getATA call to each mint to maker and taker
    // // [maker, taker] <- [mint A, mint B] <- getATA()
    // const [ makerAtaA, makerAtaB, takerAtaA, takerAtaB ] = [maker, taker]
    //   .map((a) => 
    //     [mintA, mintB].map((m) =>
    //       getAssociatedTokenAddressSync(m.publicKey, a.publicKey, false, TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID)
    //   )
    // )
    // // The .flat() method is used to flatten the array that results 
    // // from the previous .map() operations.
    // // Without .flat(), you would have a nested array 
    // // structure like [[makerAtaA, makerAtaB], [takerAtaA, takerAtaB]].
    // .flat();

    // const seed = new BN(randomBytes(8));
    // // Initialize the escrow account
    // const escrow = PublicKey.findProgramAddressSync(
    //   [
    //     Buffer.from('escrow'),
    //     maker.publicKey.toBuffer(),
    //     // Convert a numeric value (BigNumber object, 
    //     // a library used for handling large integers in Javascript )
    //     // into a fixed-size byte array (or buffer)
    //     seed.toArrayLike(Buffer, 'le', 8)
    //   ],
    //   program.programId
    // )[0];

    // // Get the vault
    // const vault = getAssociatedTokenAddressSync(mintA.publicKey, escrow, true, TOKEN_2022_PROGRAM_ID);

    // // Now we need to fund the maker and take then use those
    // // funds to create, initialize, and mint the tokens for mint A and mint B
    // it('Airdrop and create mints', async () => {
    //   let lamports = await getMinimumBalanceForRentExemptMint(connection);
    //   let tx = new Transaction();
    //   tx.instructions = [
    //     ...[maker, taker].map((account) => 
    //       SystemProgram.transfer({
    //         fromPubkey: provider.publicKey,
    //         toPubkey: account.publicKey,
    //         lamports: 10 * LAMPORTS_PER_SOL
    //       })
    //     ),
    //     ...[mintA, mintB].map((mint) => 
    //       SystemProgram.createAccount({
    //         fromPubkey: provider.publicKey,
    //         newAccountPubkey: mint.publicKey,
    //         lamports,
    //         space: MINT_SIZE,
    //         programId: TOKEN_2022_PROGRAM_ID
    //       })
    //     ),
    //     ...[
    //       { mint: mintA.publicKey, authority: maker.publicKey, ata: makerAtaA},
    //       { mint: mintB.publicKey, authority: taker.publicKey, ata: takerAtaB}
    //     ].flatMap((x) => [
    //       createInitializeMint2Instruction(
    //         x.mint,
    //         6,
    //         x.authority,
    //         null,
    //         TOKEN_2022_PROGRAM_ID
    //       ),
    //       createAssociatedTokenAccountIdempotentInstruction(
    //         provider.publicKey,
    //         x.ata,
    //         x.authority,
    //         x.mint,
    //         TOKEN_2022_PROGRAM_ID
    //       ),
    //       createMintToInstruction(
    //         x.mint,
    //         x.ata,
    //         x.authority,
    //         1e9,
    //         undefined,
    //         TOKEN_2022_PROGRAM_ID
    //       ),
    //     ]),
    //   ]

    //   const transactionSignature = await provider.sendAndConfirm(tx, [
    //     mintA,
    //     mintB,
    //     maker,
    //     taker,
    //   ]);

    //   console.log(getExplorerLink('transaction', transactionSignature));
    // })

    // const accounts = {
    //   maker: maker.publicKey,
    //   taker: taker.publicKey,
    //   mintA: mintA.publicKey,
    //   mintB: mintB.publicKey,
    //   makerAtaA,
    //   makerAtaB,
    //   takerAtaA,
    //   takerAtaB,
    //   escrow,
    //   vault,
    //   TOKEN_2022_PROGRAM_ID,
    // }
    // const confirm = async (signature: string): Promise<string> => {
    //   const block = await connection.getLatestBlockhash();
    //   await connection.confirmTransaction({
    //     signature,
    //     ...block,
    //   });
    //   return signature;
    // };

    // const log = async (signature: string): Promise<string> => {
    //   console.log(
    //     `Your transaction signature: https://explorer.solana.com/transaction/${signature}?cluster=custom&customUrl=${connection.rpcEndpoint}`
    //   );
    //   return signature;
    // };

    // const make = async () => {
    //   await program.methods
    //     .make(seed, new BN(1e6), new BN(1e6))
    //     .accounts({ ...accounts})
    //     .signers([maker])
    //     .rpc()
    //     .then(confirm)
    //     .then(log)
    // };

    // const take = async () => {
    //   await program.methods
    //     .take()
    //     .accounts({ ...accounts })
    //     .signers([taker])
    //     .rpc()
    //     .then(confirm)
    //     .then(log)
    // };

    // const refund = async () => {
    //   await program.methods
    //     .refund()
    //     .accounts({...accounts})
    //     .signers([maker])
    //     .rpc()
    //     .then(confirm)
    //     .then(log)
    // };

    // // 1. Make
    // //   a. Initialize the escrow
    // //   b. Deposit to the vault
    // // 2. Refund
    // //   a. Withdraw from the vault
    // //   b. Close accounts
    // it("Initialize escrow, deposit to vault, then withdraw and close accounts", async () => {
    //   await make();
    //   await refund();
    // })

    // // 1. Make
    // //   a. Initialize the escrow
    // //   b. Deposit mint A to the vault
    // // 2. Take
    // //   a. Transfer mint B tokens from taker to maker
    // //   b. Withdraw mint A tokens from vault to taker
    // it("Initialize escrow, deposit mint A from maker to vault, transfer mint B to maker, withdraw mint A from vault to taker", async () => {
    //   await make();
    //   await take();   
    // })
  } catch (error) {
    console.error("Runtime error during setup:", error);
  }
});
