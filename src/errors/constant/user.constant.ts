import { User } from 'src/users/user.entity';

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
};
