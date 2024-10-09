export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await fetch("http://localhost:8082/articles/articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        res.status(200).json(data); // send the articles to the client
      } else {
        res.status(500).json({ error: "Failed to fetch articles" });
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
