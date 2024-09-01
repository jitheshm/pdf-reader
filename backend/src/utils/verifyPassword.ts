import bcrypt from 'bcryptjs'

export default (password: string, hashPassword: string) => {
    const res = bcrypt.compareSync(password, hashPassword);
    return res
}