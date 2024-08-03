import wallet from "./wallet/wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        console.log("Current directory:", process.cwd());
        console.log(`${__dirname}`);
        //1. Load image
        let file = await readFile("./cluster1/images/generug.png");
        //2. Convert image to generic file.
        let generic_file = await createGenericFile(file, "Best Rug Ever");
        const price = await umi.uploader.getUploadPrice([generic_file]);
        console.log(`Price basis points ${price.basisPoints}`);
        //3. Upload image
        const [myUri] = await umi.uploader.upload([generic_file], {
            onProgress: (percent) => {
                console.log(`${percent * 100}% uploaded...`)
            }
        });
        console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
