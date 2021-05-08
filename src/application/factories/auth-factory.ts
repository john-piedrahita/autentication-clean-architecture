import {authMiddlewareAdapter} from "@/application/config/auth-middleware-adapter";
import {makeAuthMiddlewareFactory} from "@/application/factories/auth-middleware-factory";

export const auth = authMiddlewareAdapter(makeAuthMiddlewareFactory())
