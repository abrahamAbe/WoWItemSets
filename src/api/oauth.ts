import axios from 'axios'
import { getTokenEndpoint } from './endpoints'
import { DataObject, AuthObject, OptionsObject } from '../models/modelObjects'
import qs from 'qs'

//getting auth token to use with Blizzard's APIs
const url: string = getTokenEndpoint,

    data: DataObject = {
        grant_type: 'client_credentials'
    },

    auth: AuthObject = {
        username: process.env.REACT_APP_CLIENT_ID,
        password: process.env.REACT_APP_CLIENT_SECRET
    },

    options: OptionsObject = {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(data),
        auth: auth,
        url
    }

const getOauthToken = axios,
    getOauthTokenOptions = options

export { getOauthToken, getOauthTokenOptions }