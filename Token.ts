import * as jwt from 'jsonwebtoken';
import { CONFIG } from './config';

export class Token {
    export function Create(tokenData: any) {
        return jwt.sign(tokenData, CONFIG.SECRET, { expiresIn: CONFIG.TOKEN_TIMELIFE });
    }
}
