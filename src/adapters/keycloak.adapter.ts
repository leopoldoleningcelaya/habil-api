import axios from 'axios';
import jwt from 'jsonwebtoken';
import KcConnect from 'keycloak-connect';
import { stringify as qsStringify } from 'qs';
import { KEYCLOAK_ADMIN_CONFIG, KEYCLOAK_CONFIG } from '@config';
import { UserRoles } from '@enums';
import {
  AuthInvalidLogin,
  InvalidRefreshToken,
  InvalidToken,
  UserAlreadyExists,
  UserNotFound,
} from '@errors/auth.error';
import { Page } from '@interfaces';
import { AuthAdapter, AuthUser, LoginGrant } from '@interfaces/auth.interface';
import { GetAllUsersParams } from '@params/user.param';
import { paginateArray } from '@utils/paginateArray';

interface UserRepresentation {
  id?: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  enabled?: boolean;
  emailVerified?: boolean;
  attributes?: {
    roles: UserRoles[];
  };
  createdTimestamp?: number;
}

function mapUserRepresentationToUserResponse(user: UserRepresentation): AuthUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    enabled: user.enabled,
    emailVerified: user.emailVerified,
    roles: user.attributes?.roles,
    createdTimestamp: user.createdTimestamp,
  };
}

export class KeycloakAuthAdapter implements AuthAdapter {
  public keycloak: KcConnect.Keycloak;
  public kcAdminClient;

  constructor() {
    this.keycloak = new KcConnect({}, KEYCLOAK_CONFIG);
    import('@keycloak/keycloak-admin-client') //podría ser mas prolijo
      .then((keycloakAdminClient) => {
        this.kcAdminClient = new keycloakAdminClient.default({
          baseUrl: KEYCLOAK_CONFIG.serverUrl,
          realmName: KEYCLOAK_CONFIG.realm,
        });
        this.kcAdminClient.auth(KEYCLOAK_ADMIN_CONFIG).catch((e) => {
          console.log(`Keycloak error: ${e}`);
        });
        setInterval(() => this.kcAdminClient.auth(KEYCLOAK_ADMIN_CONFIG), 58 * 1000); //58 sec
      })
      .catch((e) => {
        console.log(`Keycloak error: ${e}`);
      });
  }

  public async refreshToken(refresh_token: string): Promise<LoginGrant> {
    const data = {
      grant_type: 'refresh_token',
      client_id: KEYCLOAK_CONFIG.resource,
      client_secret: KEYCLOAK_CONFIG.secret,
      refresh_token,
    };
    return axios
      .post(
        `${KEYCLOAK_CONFIG.serverUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`,
        qsStringify(data),
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        if (e.response.status === 400) {
          throw new InvalidRefreshToken(e.response.data.error_description);
        }
      });
  }

  public async login(email: string, password: string): Promise<LoginGrant> {
    return this.keycloak.grantManager
      .obtainDirectly(email, password)
      .then((grant) => JSON.parse(grant.toString()))
      .catch(() => {
        //message from e.message is not very helpful
        throw new AuthInvalidLogin('Invalid email or password.');
      });
  }

  public async addUser(
    username: string,
    email: string,
    password: string,
    roles: UserRoles[]
  ): Promise<string> {
    return this.kcAdminClient.users
      .create({
        email,
        enabled: true,
        username,
        credentials: [
          {
            temporary: false,
            type: 'password',
            value: password,
          },
        ],
        attributes: {
          roles: roles,
        },
      })
      .catch((e) => {
        const { response } = e;
        if (response && response.status === 409)
          throw new UserAlreadyExists(response.data && response.data.errorMessage);
        throw e;
      });
  }

  public async changeUserPassword(id: string, password: string): Promise<void> {
    return this.kcAdminClient.users.update(
      { id },
      {
        credentials: [
          {
            temporary: false,
            type: 'password',
            value: password,
          },
        ],
      }
    );
  }

  public async getUserById(id: string): Promise<AuthUser> {
    return this.kcAdminClient.users
      .findOne({
        id: id,
      })
      .then(mapUserRepresentationToUserResponse);
  }

  public async getUserByUsername(username: string): Promise<AuthUser> {
    return this.kcAdminClient.users
      .find({
        username: username,
        exact: true,
      })
      .then((user) => {
        if (
          !user[0] ||
          (user[0].attributes.is_service_user && user[0].attributes.is_service_user[0] == 'true') //avoid getting user created for services
        )
          throw new UserNotFound('User not found');
        return mapUserRepresentationToUserResponse(user[0]);
      });
  }

  public async modifyUserRoles(id: string, roles: UserRoles[]): Promise<void> {
    return this.kcAdminClient.users.update(
      { id },
      {
        attributes: {
          roles: roles,
        },
      }
    );
  }

  public async getUsers(filters: GetAllUsersParams): Promise<Page<AuthUser>> {
    const { roles, pageNumber, pageSize } = filters;
    let q = '';

    if (roles) {
      q += `roles:${roles[0]} `;
    }
    const users: UserRepresentation[] = await this.kcAdminClient.users
      .find({
        q,
      }) //do not return users that are created for services
      .then((users) =>
        users.filter(
          (user) =>
            !user.attributes.is_service_user || user.attributes.is_service_user[0] !== 'true'
        )
      );
    console.log(users);
    const page: Page<UserRepresentation> = paginateArray(users, pageNumber, pageSize);
    return { ...page, content: page.content.map(mapUserRepresentationToUserResponse) };
  }

  public async setUserEnabled(id: string, enabled: boolean): Promise<void> {
    return this.kcAdminClient.users.update({ id }, { enabled }).catch((e) => {
      throw new UserNotFound(e.response.data.error);
    });
  }

  public async verifyToken(token: string): Promise<AuthUser> {
    return this.keycloak.grantManager.validateAccessToken(token).then((token: string | false) => {
      if (token) {
        return jwt.decode(token);
      } else {
        throw new InvalidToken();
      }
    });
  }
}
