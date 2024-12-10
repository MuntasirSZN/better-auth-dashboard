import type { NextRequest, NextResponse } from "next/server";
// import { createAuthClient } from "better-auth/react"

// export const authClient = createAuthClient({
//     baseURL: `http://localhost:${process.env.PORT}`
// })

export const dashboardMiddleware = (
  callback: (request?: NextRequest) => Promise<void | NextResponse> | void | NextResponse
) => {
  return async (request: NextRequest) => {
    // const session = await authClient.getSession();
    // if(session.error){
    //     console.error(session.error);
    //     throw session.error;
    // }

    return await callback(request);
  };
};

export const dashboardMatcher = () => {
  return [];
}