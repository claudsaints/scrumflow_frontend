import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#e6edf1',
            100: '#cddbe4',
            200: '#9ab7c9',
            300: '#6693ad',
            400: '#336f92',
            500: '#103C55',
            600: '#0d3044',
            700: '#0a2433',
            800: '#061822',
            900: '#030c11',
            950: '#010508'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '#103C55',
                    hoverColor: '#0b2c3f',
                    activeColor: '#336f92'
                },
                highlight: {
                    background: '#103C55',
                    focusBackground: '#3C9FA7',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                },
                text: {
                    color: '#1a1a1a',
                    mutedColor: '#f4f4f4'
                }
            },
            dark: {
                primary: {
                    color: '#3C9FA7',
                    hoverColor: '#357e8a',
                    activeColor: '#2d8e95'
                },
                highlight: {
                    background: 'rgba(60, 159, 167, 0.16)',
                    focusBackground: 'rgba(60, 159, 167, 0.24)',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                },
                text: {
                    color: '#f4f4f4',
                    mutedColor: '#3C9FA7'
                }
            }
        }
    },
    components: {
        button: {
            css: () => `
                .p-button {
                    color: #fff;
                    background: var(--primary);
                    border: none;
                    border-radius: var(--radius, 4px);
                    font-family: inherit;
                    font-weight: bold;
                    font-size: 1rem;
                    padding: 0.6em 1.2em;
                    text-align: center;
                    transition: var(--transition, all 0.2s);
                }

                .p-button:hover {
                    background: var(--primary-hover);
                    color: #fff;
                    cursor: pointer;
                }

                /* Botão com severity="secondary" */
                .p-button-secondary {
                    background: var(--secondary);
                    color: #fff;
                }

                .p-button-secondary:hover {
                    background: var(--secondary-hover);
                    color: #fff;
                }
            `
        },
        password: {
            css: () => `
                .p-password{
                    display: block;
                }
                    .p-password-mask-icon :hover{
                        cursor: pointer;
                    }
            `

        }
    }
});

export default MyPreset;
