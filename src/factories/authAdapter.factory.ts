import { KeycloakAuthAdapter } from '@adapters/keycloak.adapter';
import { AuthAdapter } from '@interfaces/user.interface';

const authAdapter = new KeycloakAuthAdapter();
export function getAuthAdapter(): AuthAdapter {
  return authAdapter;
}
