import { object, string } from 'yup'
export const createValidation = object({
  username: string().matches(/[a-zA-z_]\w{4,15}$/, '用户名只能包含数字、字母、下划线，且长度为4-15').required('username 不能为空'),
  password: string().required('password 不能为空')
})
