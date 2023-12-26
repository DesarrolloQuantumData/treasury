import { treasuryApi } from '@/features/common/api/treasuryApi'
import { Roles } from '@/features/common/consts'
import { AuthUserSchema } from '@/features/common/shemas/userSchema'
import type { AuthUser, AuthValues } from '@/features/common/types'

export const login = async (data: AuthValues): Promise<AuthUser> => {
  const response = await treasuryApi.post('/auth/login', data);
  return AuthUserSchema.parse(response);
}

interface RefreshTokenDTO {
  token: string
  refreshToken: string
}
export const refreshToken = async (data: RefreshTokenDTO): Promise<AuthUser> => {
  const res = (await treasuryApi.post('/auth/refreshToken', data)) as AuthUser
  if (!res.roleName) {
    res.roleName = Roles.JEFE
  }

  return AuthUserSchema.parse(res)
}