function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-5 mt-10 text-center">
      <div className="font-bold text-lg">PawMart 🐾</div>
      <p className="mt-2">
        PawMart connects local pet owners and buyers for adoption and pet care products.
      </p>
      <p className="mt-2 text-sm">© 2026 PawMart. All rights reserved.</p>
      <div className="mt-2 flex justify-center gap-5">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/terms">Terms</a>
      </div>
    </footer>
  );
}

export default Footer;
