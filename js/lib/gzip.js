// ==========================================================================
// GZIP + BASE64 STRINGS
// Shrinks a large JSON text (the save snapshot shared with the co-op room,
// ~130 KB) to about a fifth, as a string Firestore can store.
// ==========================================================================

const pipe = (bytes, stream) => new Response(new Blob([bytes]).stream().pipeThrough(stream));

export async function gzip64(text) {
  const bytes = new Uint8Array(await pipe(text, new CompressionStream('gzip')).arrayBuffer());
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

export async function gunzip64(z) {
  const bytes = Uint8Array.from(atob(z), c => c.charCodeAt(0));
  return pipe(bytes, new DecompressionStream('gzip')).text();
}
