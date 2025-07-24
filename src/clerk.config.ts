const CLERK_PUBLISHABLE_KEY = "pk_test_bm9ibGUtc3dpZnQtNzcuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

export { CLERK_PUBLISHABLE_KEY };