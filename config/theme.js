import { createTheme } from '@mui/material'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfigModules from '../tailwind.config'
const tailwindConfig = resolveConfig(tailwindConfigModules)

export const theme = createTheme({
    palette: {
        primary: {
            main: tailwindConfig.theme.colors.primary.main,
            light: tailwindConfig.theme.colors.primary.light,
            dark: tailwindConfig.theme.colors.primary.dark,
            accent: tailwindConfig.theme.colors.primary.accent,
            contrastText: tailwindConfig.theme.colors.primary.contrastText,
        },
    },
})
