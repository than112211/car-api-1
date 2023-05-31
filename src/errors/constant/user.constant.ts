import { User } from 'src/users/user.entity';
// using throw in service
export const userError = {
  isExistEmail: {
    code: 'user-2000',
    field: 'email',
    resource: User.name,
  },
  isNotExistUser: {
    code: 'user-2001',
    field: 'id',
    resource: User.name,
  },
  isWrongPassword: {
    code: 'user-2002',
    field: 'password',
    resource: User.name,
  },
  unauthorize: {
    code: 'user-2003',
    field: 'jwt',
    resource: User.name,
  },
  isExpiredJWT: {
    code: 'user-2004',
    field: 'jwt',
    resource: User.name,
  },
};
