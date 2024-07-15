const HamburgerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="currentColor" fillRule="evenodd">
      <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
    </g>
  </svg>
);

export { HamburgerIcon };
