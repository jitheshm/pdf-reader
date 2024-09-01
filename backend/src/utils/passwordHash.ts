import bcrypt from 'bcryptjs'

export default (password: string) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}