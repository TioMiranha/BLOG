'use client'; // <- essa bosta se espalha para todos os outros componentes mesmo sendo server-component

export function ClientComponent({ children }: { children: React.ReactNode }) {
  console.log('ClientComponent');
  return <div>ClientComponent {children}</div>;
}
