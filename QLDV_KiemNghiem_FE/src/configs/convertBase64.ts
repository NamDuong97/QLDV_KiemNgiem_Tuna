export function base64ToFile(base64String: any, filename: any) {
  if (!base64String?.includes(",")) {
    console.error("Input is not a valid base64 string:", base64String);
    return null;
  }

  const arr = base64String.split(",");
  const match = arr[0].match(/:(.*?);/);
  if (!match) {
    console.error("Cannot extract MIME type:", arr[0]);
    return null;
  }

  const mime = match[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
