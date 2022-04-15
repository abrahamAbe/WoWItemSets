import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getOauthToken, getOauthTokenOptions } from './oauth'

enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500
}

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: 'application/json',
    ...(localStorage.getItem('authToken') && {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    }),
    'Content-Type': 'application/json charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
}

class Http {
    private instance: AxiosInstance | null = null

    private initHttp() {
        const http = axios.create({
            headers
        })

        http.interceptors.response.use(
            (response) => response,
            (error) => {
                const { response } = error
                return this.handleError(response)
            }
        )

        this.instance = http

        return http
    }

    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp()
    }

    request<T = unknown, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.http.request(config)
    }

    get<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.get<T, R>(url, config)
    }

    post<T = unknown, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.post<T, R>(url, data, config)
    }

    put<T = unknown, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.put<T, R>(url, data, config)
    }

    delete<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.delete<T, R>(url, config)
    }

    //we can handle generic app errors based on the status code
    private handleError(error: any) {
        const { status } = error

        switch (status) {
            //get new auth token when current one expires
            case StatusCode.Unauthorized: {
                getOauthToken(getOauthTokenOptions).then(response => {
                    localStorage.setItem('authToken', response.data.access_token)
                })
                break
            }
            case StatusCode.InternalServerError: {
                //handle internalServerError
                break
            }
            case StatusCode.Forbidden: {
                //handle forbidden
                break
            }
            case StatusCode.TooManyRequests: {
                //handle tooManyRequests
                break
            }
        }

        return Promise.reject(error)
    }
}

export const httpClient = new Http()