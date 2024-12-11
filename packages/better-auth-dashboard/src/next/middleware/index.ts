import type { createAuthClient } from "better-auth/client";
import type { NextRequest, NextResponse } from "next/server";


export const dashboardMiddleware = (
  auth: ReturnType<typeof createAuthClient>,
  callback: (
    request?: NextRequest
  ) => Promise<void | NextResponse> | void | NextResponse
) => {
  return async (request: NextRequest) => {
    const {data, error} = await auth.getSession({fetchOptions: {headers: request.headers}});

    if(error){
        console.error(error);
        throw error;
    }
    console.log(data)

    return await callback(request);
  };
};

export const dashboardMatcher = () => {
  return [`/dashboard/:path*`];
};
