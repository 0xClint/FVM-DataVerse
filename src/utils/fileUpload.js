import lighthouse from "@lighthouse-web3/sdk";

const progressCallback = (progressData) => {
  let percentageDone =
    100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
  console.log(percentageDone);
};

export async function uploadFile(file) {
  const output = await lighthouse.upload(
    file,
    "8228fa3b.e18f37e0f0404b11a31ddaf9deeb9a0a",
    progressCallback
  );
  console.log("File Status:", output);
  console.log(output);
  console.log(
    "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
  );
  return output.data.Hash;
}
