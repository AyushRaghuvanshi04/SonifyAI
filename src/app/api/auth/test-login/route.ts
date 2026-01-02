import { getServerAuth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
	const session = await getServerAuth();
	return NextResponse.json({
		session: session ? {
			user: session.user,
			expires: session.expires,
		} : null,
	});
}

