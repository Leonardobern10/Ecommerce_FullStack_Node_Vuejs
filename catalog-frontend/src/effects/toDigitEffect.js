/** Importando a bibliteca GSAP */
import gsap from 'gsap';

/** Importamos o TextPlugin para o efeito */
import { TextPlugin } from 'gsap/all';

/** Registramos o plugin */
gsap.registerPlugin(TextPlugin);

/**
 *
 * @param {string} component Recebe um seletor css. Ex: #nome, .nome ou tagname.
 */
export const toDigitEffect = (component, text) => {
    gsap.to(component, { duration: 5, text: text });
};
