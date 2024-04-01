import { User } from "./User"
import { list } from "postcss"

export type LoginSuccess = {
    token: string
    succeddeed: boolean,
    refreshToken: string,
    user: User
    errors: any
}
