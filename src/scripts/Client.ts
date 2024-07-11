import {isLocalhost, context, RestClient} from "../../include/engine"
import User from "./User"
import {controller} from "./Controller"

const client: RestClient = new RestClient(isLocalhost ? 'http://192.168.100.22:8814/v1' : 'https://pizza-api.playdeck.io/v1')
console.log(`server: ${client.serverUrl}`)

export async function initializeUser(): Promise<User> {
    const user: User | undefined = await client.put('user/init', {username: context.playdeck.user.username})
    return user ?? new User()
}

export async function updateUserScore(roundScore: number): Promise<User> {
    const user: User | undefined = await client.put('user/update', {score: roundScore, id: controller.user.roundId})
    return user ?? controller.user
}
