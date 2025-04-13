import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

/**
 * Produz o efeito ao componente que simula um deslocamento
 * de uma posição inicial definida pelo metodo até sua
 * posição final.
 *
 * @param {string} component Recebe um seletor CSS.
 * @param {string} startPosition Recebe uma string com a posição
 * inicial do componente. Valor negativos representam ESQUERDA
 * e valor positivos representam DIREITA.
 */
export const toScrollEffect = (component, startPosition) => {
    gsap.from(component, {
        scrollTrigger: {
            trigger: component,
            start: `${startPosition} center`,
            end: '200px center',
            toggleActions: 'restart pause restart pause',
            onblur: 0,
            markers: true,
        },
        x: -200,
        duration: 1.5,
        autoAlpha: 0,
    });
};
