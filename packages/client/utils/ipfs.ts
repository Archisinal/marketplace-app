type TUploadResult = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate?: boolean;
};

export async function uploadIpfs(file: File): Promise<TUploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('http://localhost:3001/upload_ipfs', {
    method: 'POST',
    body: formData,
  });

  return await response.json();
}
