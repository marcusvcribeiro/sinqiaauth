export type ToastType = 'error' | 'info' | 'success' | 'alert';

export class Toast {
  text: string;
  type?: ToastType;
}
