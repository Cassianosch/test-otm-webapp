import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
    base: '0em',
    xs: '20em',
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
});

const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    breakpoints,
    styles: {
        global: {
            '*': {
                boxSizing: 'border-box',
                margin: 0,
                padding: 0,
            },
        },
    },
    fonts: {
        heading: 'Poppins, sans-serif',
        body: 'Poppins, sans-serif',
    },
    colors: {
        studentapi: {
            primary: {
                300: '#00c1b1',
                500: '#29c5b8',
                700: '#7ac7c0',
            },
            secondary: {
                500: '#0F0F0F',
            },
            variants: {
                grey: '#78909c',
                darkGrey: '#324c56',
                lightGrey: '#f4f7f9',
                iconGrey: '#cbd2da',
                inputBorderGrey: '#e6ecef',
            },
        },
    },
    components: {
        Button: {
            variants: {
                'form-submit': {
                    bgColor: 'studentapi.primary.500',
                    padding: '1.4rem 4rem',
                    color: 'white',
                    fontWeight: '400',
                    transition: 'all .5s ease',
                    fontSize: '.85rem',
                    _hover: {
                        bgColor: 'studentapi.primary.700',
                        _loading: {
                            bgColor: 'studentapi.primary.500',
                        },
                    },
                },
                delete: {
                    bgColor: 'red.500',
                    padding: '1.4rem 4rem',
                    color: 'white',
                    fontWeight: '400',
                    transition: 'all .5s ease',
                    fontSize: '.85rem',
                    _hover: {
                        bgColor: 'red.700',
                        _loading: {
                            bgColor: 'red.700',
                        },
                        _disabled: {
                            bgColor: 'red.700',
                        },
                    },
                },
            },
        },
        Link: {
            baseStyle: {
                color: 'gray.900',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                _hover: {
                    color: 'studentapi.primary.700',
                },
            },
        },
    },
});

export default theme;
