import classNames from "classnames";


interface WithExpandProps {
  isOpen: boolean;
}
export const withExpand = <P extends { className?: string }>(
  Component: React.ComponentType<P>
) => {
  return ({ isOpen, className, ...props }: WithExpandProps & P) => {
    const combinedClassName = classNames(
      'transition-all duration-300 ease-in-out overflow-hidden',
      className,
      {
        'mb-0 max-h-0 py-0 opacity-0': !isOpen,
        'mb-3 max-h-96 py-4 opacity-100': isOpen,
      }
    );

     return <Component {...(props as unknown as P)} className={combinedClassName} />;
  };
};
