import { Link as ReactRouterLink, type LinkProps as ReactRouterLinkProps } from 'react-router-dom'

export interface LinkProps extends ReactRouterLinkProps, React.RefAttributes<HTMLAnchorElement> {}

export const Link: React.FC<LinkProps> = ({ children, className, ...restOfProps }) => {
  return (
    <ReactRouterLink className={`text-primary hover:underline ${className}`} {...restOfProps}>
      {children}
    </ReactRouterLink>
  )
}
