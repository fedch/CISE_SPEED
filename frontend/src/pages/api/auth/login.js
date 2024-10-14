export default async function handler(req, res) {
    if (req.method === 'POST') {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data); // send back token or user info
      } else {
        res.status(401).json(data);
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  