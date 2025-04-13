import gsap from 'gsap';

export const toLeftEffect = (component) => {
    gsap.from(component, {
        x: -100,
        delay: 0.2,
        duration: 1.2,
        autoAlpha: 0.2,
        ease: 'expo.out',
    });
};
