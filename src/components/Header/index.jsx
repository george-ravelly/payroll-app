import NavBarApp from '../Navbar'

export default function Header({ content }) {
  return (
    <header className="header">
      <NavBarApp content={content} />
    </header>
  );
}