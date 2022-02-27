import axios from "~/lib/http/axios";
import { NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { AuthProps, options, Request } from "~/lib/security/iron-session";

const handler = async (req: Request, res: NextApiResponse) => {
  const {
    status,
    data: { data },
  } = await axios.post<AuthProps>("/api/auth/login", req.body);

  if (status === 200) {
    req.session.auth = data;
    await req.session.save();
    return res.json({ ok: true });
  } else return res.status(status).json({ ok: false, code: status });
};

export default withIronSessionApiRoute(handler as any, options);
