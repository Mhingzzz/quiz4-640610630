import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";
export default function summaryRoute(req, res) {
	if (req.method === "GET") {
		//check authentication
		const user = checkToken(req);
		if (!user || !user.isAdmin) {
			return res.status(403).json({
				ok: false,
				message: "Permission denied",
			});
		}

		//return res.status(403).json({ ok: false, message: "Permission denied" });
		//compute DB summary
		//return response
		const users = readUsersDB();
		const onlyUser = users.filter((x) => !x.isAdmin);
		const totalUsers = users.filter((user) => !user.isAdmin).length;
		const totalAdmins = users.filter((user) => user.isAdmin).length;
		const totalMoney = onlyUser.reduce((acc, user) => acc + user.money, 0);
		console.log(totalMoney);
		return res.json({
			ok: true,
			userCount: totalUsers,
			adminCount: totalAdmins,
			totalMoney: totalMoney,
		});
	} else {
		return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
	}
}
