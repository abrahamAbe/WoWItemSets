import 'styled-components'

//extending DefaultTheme, add any new theme fields here, appTheme.ts and index.tsx
declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            screenBackground: string,
            white: string
        }
        dimensions: {
            screenWidth: string,
            screenPadding: string,
        }
    }
}