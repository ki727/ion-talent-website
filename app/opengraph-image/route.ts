import { SOCIAL_PREVIEW_PATH } from "@/lib/site-config"

/** Keep existing links to the former default preview image working. */
export function GET(request: Request) {
  return Response.redirect(new URL(SOCIAL_PREVIEW_PATH, request.url), 307)
}
