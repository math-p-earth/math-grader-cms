import { Access } from 'payload/config'

/**
 * Returns an access function which returns true if there is a logged in user from any auth collections.
 */
export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user)
}
