import jwt from 'jsonwebtoken';
import TokensRepository from '../repositories/TokensRepository.js';

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_TIME });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_TIME });
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    saveToken(userId, refreshToken) {
        const tokenData = TokensRepository.getOne({ id: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return TokensRepository.update(userId, tokenData);
        }
        const token = TokensRepository.create({ refreshToken }, userId);
        return token;
    }

    removeToken(refreshToken) {
        const tokenData = TokensRepository.delete(refreshToken);
        return tokenData;
    }

    findToken(refreshToken) {
        const tokenData = TokensRepository.getOne({ refreshToken });
        return tokenData;
    }
}

export default new TokenService();