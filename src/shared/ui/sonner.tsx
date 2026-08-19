import { Toaster as Sonner, type ToasterProps } from 'sonner';

/** App-wide toast host. Mounted once, near the router. */
export const Toaster = (props: ToasterProps) => (
  <Sonner
    className="toaster group"
    position="top-center"
    toastOptions={{
      classNames: {
        toast:
          'group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground'
      }
    }}
    {...props}
  />
);
