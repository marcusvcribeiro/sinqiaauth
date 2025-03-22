import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const animationsDuration = 250;

export const toastAnimations: {
  readonly fadeToast: AnimationTriggerMetadata;
} = {
  fadeToast: trigger('fadeAnimation', [
    state('in', style({
      opacity: 1
    })),
    transition('void => *', [style({
      opacity: 0
    }), animate (animationsDuration + 'ms')]),
    transition(
      'default => closing',
      animate (animationsDuration + 'ms', style({
        opacity: 0
      })),
    ),
  ]),
};

export type ToastAnimationState = 'default' | 'closing';
