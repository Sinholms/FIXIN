export type DemoUser = {
  name: string
  email: string
}

const SESSION_KEY = 'fixin-demo-user'

export function saveDemoUser(user: DemoUser) {
  window.localStorage.removeItem(SESSION_KEY)
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function hasDemoUser() {
  window.localStorage.removeItem(SESSION_KEY)
  return Boolean(window.sessionStorage.getItem(SESSION_KEY))
}

export function readDemoUser(): DemoUser {
  const raw = window.sessionStorage.getItem(SESSION_KEY)

  if (!raw) {
    return {
      name: 'Raka Pratama',
      email: 'raka.pratama@email.com',
    }
  }

  try {
    return JSON.parse(raw) as DemoUser
  } catch {
    return {
      name: 'Raka Pratama',
      email: 'raka.pratama@email.com',
    }
  }
}

export function clearDemoUser() {
  window.localStorage.removeItem(SESSION_KEY)
  window.sessionStorage.removeItem(SESSION_KEY)
}
