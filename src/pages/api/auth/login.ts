import { isNil } from "lodash";
import axios from "~/lib/http/axios";
import { NextApiHandler } from "next";
import { options } from "~/lib/security/iron-session";
import { withIronSessionApiRoute } from "iron-session/next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    if (isNil(req.session.auth)) {
      const response = await axios.post("/api/auth/login", req.body);
      if (response.status === 200) {
        req.session.auth = response.data;
        await req.session.save();
      }

      return res.status(response.status).json(response.data);
    } else return res.status(403).send("Already logged in");
  }
};

export default withIronSessionApiRoute(handler, options);
