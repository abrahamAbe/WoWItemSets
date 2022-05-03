import 'styled-components'

//extending DefaultTheme, add any new theme fields here, appTheme.ts and index.tsx
declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            darkGray: string,
            lightGray: string,
            black: string,
            white: string,
            blue: string,
            lightBlue: string,
            overlayBlue: string
        }
        dimensions: {
            screenWidth: string,
            screenPadding: string,
            //responsive
            mobileLg: string
        }
    }
}