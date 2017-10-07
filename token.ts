import * as jwt from 'jsonwebtoken';
import { CONFIG } from './config';

export module token {
    export function Create(tokenData: any) {
        return jwt.sign({
          data: tokenData },
          CONFIG.SECRET,
          { expiresIn: CONFIG.TOKEN_TIMELIFE });
    }
}