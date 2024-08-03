import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "./wallet/wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("EL73XN7G22qp16VdCTMKrBUcgLb2413NwWC5ZnqEeajV");

// Recipient address
const to = new PublicKey("AHMJhfoQFHE7edJGgnnjPynPjrkur7z2Z8ApT7F3TaAF");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it

        let fromATA = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,
            false,
            commitment,
            undefined,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_PROGRAM_ID,
        )

        // Get the token account of the toWallet address, and if it does not exist, create it

        let toATA = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to,
            false,
            commitment,
            undefined,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_PROGRAM_ID,
        )

        // Transfer the new token to the "toTokenAccount" we just created


    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();