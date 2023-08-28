import klontongLogo from "../assets/klontong-icon.webp";

function Footer() {
	return (
		<footer className="lg:px-40 md:px-10 py-10 font-inter">
			<div className="container mx-auto flex md:flex-row flex-col gap-y-5 items-center justify-between">
				<div className="flex items-center gap-x-2">
					<img src={klontongLogo} alt="Logo" className="w-8 h-8" />
          <p className="font-black">Klontong</p>
				</div>
				<p>© 2023 Klontong. All rights reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
