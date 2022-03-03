import axios from "~/lib/http/axios";
import { NextApiHandler } from "next";

// This endpoint acts as a proxy for the frontend. The requests will be automatically
// redirected to the API.
const handler: NextApiHandler = async (req, res) => {
  const { slug } = req.query as {
    slug: string[];
  };

  const response = await axios({
    data: req.body,
    url: slug.join("/"),
    headers: req.headers as any,
    method: req.method?.toLowerCase() as any,
  });

  return res.status(response.status).json(response.data);
};

export default handler;
