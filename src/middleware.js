// src/middleware.js
import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes accessible to everyone, logged in or not
const publicPaths = ["/", "/help"];

const clerkSpecificPublicPaths = [
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sign-out(.*)",
];

// Webhook routes that should be publicly accessible
const webhookPaths = [
  "/api/webhooks/clerk", // Add your Clerk webhook path here
  "/api/github/webhook",
];

// API routes that need to be included in the matcher
const apiRoutes = [
  "/api/github(.*)",
  "/api/github/callback", // GitHub callback URL must be public
  // "/api/github/webhook(.*)", // Webhook endpoints must be public
  "/api/(.*)", // Match all API routes
];

// Remove duplicates
const allPublicPaths = [
  ...new Set([
    ...publicPaths,
    ...clerkSpecificPublicPaths,
    ...webhookPaths,
    ...apiRoutes,
  ]),
];

const isPublicRoute = createRouteMatcher([
  ...publicPaths,
  ...clerkSpecificPublicPaths,
  ...webhookPaths,
  ...apiRoutes,
]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;
  const isPublic = isPublicRoute(req);

  // Special case for webhook endpoints
  if (webhookPaths.some((path) => pathname.startsWith(path)))
    return NextResponse.next();

  const { userId } = await auth();
  const isAuthed = !!userId;

  if (!isPublic && !isAuthed) {
    const homeUrl = new URL("/", req.url);
    console.log(
      `🔒 Unauthenticated access. Redirecting to: ${homeUrl.toString()}`
    );
    return NextResponse.redirect(homeUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", "/", "/api/(.*)"],
};
