import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ? Criação de uma collection User
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshTokens: [{ type: String }],
});

// ? Função executada antes de salvar o documento User
userSchema.pre('save', async function (next) {
    // Se a senha tiver sido modificada ele chama a função next()
    // que é um callback que cuidará desse erro
    if (!this.isModified('password')) return next();

    // faz a criptografia da senha do usuario e salva
    // no banco de dados atrelando ao usuário
    this.password = await bcrypt.hash(this.password, 10);
});

// Metodo para comparar os hashes e verificar equivaência
userSchema.methods.matchPassword = async function (password) {
    // Retorne true se são iguais
    return await bcrypt.compare(password, this.password);
};

// Exporta a constante como se fosse uma entidade com o nome de User
// representando uma collection no banco de dados
export default mongoose.model('User', userSchema);
