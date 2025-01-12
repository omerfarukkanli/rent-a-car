import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

interface HeaderLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  href: string;
}

const HeaderLink = ({ name, href, ...rest }: HeaderLinkProps) => {
  return (
    <Link href={href} {...rest}>
      {name}
    </Link>
  );
};

export default HeaderLink;
