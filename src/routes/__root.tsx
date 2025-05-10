import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-col min-h-svh">
        <Nav />
        <Outlet />
        <Footer />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
