const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center bg-white pt-[var(--navigation-height)]">
      {children}
    </div>
  );
};
export default AuthLayout;
