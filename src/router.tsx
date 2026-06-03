import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { RootLayout } from './routes/__root'
import { HomePage } from './routes/index'
import { TechnicianDetailPage } from './routes/teknisi.$id'
import { OrdersPage } from './routes/pesanan'
import { MessagesPage } from './routes/pesan'
import { ProfilePage } from './routes/profil'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const technicianRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teknisi/$id',
  component: TechnicianDetailPage,
})

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pesanan',
  component: OrdersPage,
})

const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pesan',
  component: MessagesPage,
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profil',
  component: ProfilePage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  technicianRoute,
  ordersRoute,
  messagesRoute,
  profileRoute,
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
