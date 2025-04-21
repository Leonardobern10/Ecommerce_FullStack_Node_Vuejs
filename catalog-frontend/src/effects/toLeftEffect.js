import gsap from 'gsap';

export const toSlideEffect = (component, startPosition) => {
    gsap.from(component, {
        x: `${startPosition}`,
        delay: 0.2,
        duration: 1.2,
        autoAlpha: 0.2,
        ease: 'expo.out',
    });
};
