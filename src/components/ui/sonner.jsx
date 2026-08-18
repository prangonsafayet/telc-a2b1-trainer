import { Toaster as Sonner } from 'sonner';

export function Toaster(props) {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground'
        }
      }}
      {...props}
    />
  );
}
