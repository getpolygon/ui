import { NextApiHandler } from "next";
import { options } from "~/lib/security/iron-session";
import { withIronSessionApiRoute } from "iron-session/next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    if (!req.session.auth) {
      return res.status(403).json({ error: "Session does not exist" });
    } else {
      req.session.destroy();
      return res.status(200).json({});
    }
  }
};

export default withIronSessionApiRoute(handler, options);
