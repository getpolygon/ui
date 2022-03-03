import { NextApiHandler } from "next";
import { options } from "~/lib/security/iron-session";
import { withIronSessionApiRoute } from "iron-session/next";

// This handler will return current session information including tokens, etc.
const handler: NextApiHandler = async (req, res) => res.json(req.session.auth);

export default withIronSessionApiRoute(handler, options);
