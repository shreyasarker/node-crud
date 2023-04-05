export default async (request) => {
  return new Promise((resolve, reject) => {
    try { 
      let body = '';
      request.on('data', (chunk) => {
        body += chunk.toString();
      });
      request.on('end', () => {
        resolve(JSON.parse(body));
      })
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}