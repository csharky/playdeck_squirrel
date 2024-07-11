import {context} from "./Engine"
import axios, {AxiosResponse} from "axios"

export class RestClient {

    readonly serverUrl: string

    constructor(serverUrl: string) {
        this.serverUrl = serverUrl
    }

    async get<T>(url: string, params?: any): Promise<T | undefined> {
        console.log(url)
        const {telegramId} = context.playdeck.user
        try {
            const response: AxiosResponse<T> = await axios.get(`${this.serverUrl}/${url}`, {
                params,
                headers: {
                    'X-Session-ID': context.playdeck.user.sessionId,
                    'X-Telegram-ID': telegramId,
                    'X-Token': context.playdeck.token,
                    'X-Referral-Telegram-ID': context.playdeck.user.params['telegramId'],
                    'X-Referral-Session-ID': context.playdeck.user.params['sessionId'],
                }
            })
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    async post<T>(url: string, data?: any): Promise<T | undefined> {
        console.log(url)
        const {telegramId} = context.playdeck.user
        try {
            const response: AxiosResponse<T> = await axios.post(`${this.serverUrl}/${url}`,
                data,
                {
                    headers: {
                        'X-Session-ID': context.playdeck.user.sessionId,
                        'X-Telegram-ID': telegramId,
                        'X-Token': context.playdeck.token,
                        'X-Referral-Telegram-ID': context.playdeck.user.params['telegramId'],
                        'X-Referral-Session-ID': context.playdeck.user.params['sessionId'],
                    }
                }
            )
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    async put<T>(url: string, data?: any): Promise<T | undefined> {
        console.log(url)
        try {
            const response: AxiosResponse<T> = await axios.put(`${this.serverUrl}/${url}`,
                data,
                {
                    headers: {
                        'X-Session-ID': context.playdeck.user.sessionId,
                        'X-Telegram-ID': context.playdeck.user.telegramId,
                        'X-Token': context.playdeck.token,
                        'X-Referral-Telegram-ID': context.playdeck.user.params['telegramId'],
                        'X-Referral-Session-ID': context.playdeck.user.params['sessionId'],
                    }
                }
            )
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

}
