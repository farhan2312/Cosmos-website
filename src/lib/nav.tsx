'use client';
// Minimal stand-ins for the TanStack Router APIs the Lovable components use,
// implemented on top of Next.js navigation.
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
  params?: Record<string, string>;
  hash?: string;
  activeProps?: { className?: string };
  children?: ReactNode;
};

export function resolvePath(to: string, params?: Record<string, string>) {
  return to.replace(/\$(\w+)/g, (_, k: string) => encodeURIComponent(params?.[k] ?? ''));
}

export function Link({ to, params, hash, activeProps, className, ...rest }: LinkProps) {
  const pathname = usePathname() ?? '/';
  const href = resolvePath(to, params) + (hash ? `#${hash}` : '');
  const base = resolvePath(to, params);
  const active = base === '/' ? pathname === '/' : pathname === base || pathname.startsWith(`${base}/`);
  const cls = [className, active ? activeProps?.className : undefined].filter(Boolean).join(' ') || undefined;
  return <NextLink href={href} className={cls} data-status={active ? 'active' : undefined} {...rest} />;
}

export function ClientOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}

export function useRouterState<T>({ select }: { select: (s: { location: { pathname: string } }) => T }): T {
  const pathname = usePathname() ?? '/';
  return select({ location: { pathname } });
}
