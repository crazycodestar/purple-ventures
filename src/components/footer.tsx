import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t py-8 px-4 bg-gray-50">
      <div className="md:mx-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              <li>
                <Link to="/">Order Status</Link>
              </li>
              <li>
                <Link to="/">Shipping</Link>
              </li>
              <li>
                <Link to="/">Returns</Link>
              </li>
              <li>
                <Link to="/">Gift Cards</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/">Careers</Link>
              </li>
              <li>
                <Link to="/">Corporate Social Responsibility</Link>
              </li>
              <li>
                <Link to="/">Diversity & Inclusion</Link>
              </li>
              <li>
                <Link to="/">Press Releases</Link>
              </li>
              <li>
                <Link to="/">Investors</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Purpleventures Card</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/">Apply for a Card</Link>
              </li>
              <li>
                <Link to="/">Pay My Bill</Link>
              </li>
              <li>
                <Link to="/">Manage My Account</Link>
              </li>
              <li>
                <Link to="/">Card Benefits</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Purpleventures, Inc.</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/">Purpleventures</Link>
              </li>
              <li>
                <Link to="/">Purpleventures Rack</Link>
              </li>
              <li>
                <Link to="/">Purpleventures Canada</Link>
              </li>
              <li>
                <Link to="/">Trunk Club</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Store Locator</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/">Find a Store</Link>
              </li>
              <li>
                <Link to="/">Free Style Help</Link>
              </li>
              <li>
                <Link to="/">Store Events</Link>
              </li>
              <li>
                <Link to="/">Restaurants</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
          <div className="flex gap-4 mb-4 md:mb-0">
            <Link to="/" className="text-xs">
              Privacy
            </Link>
            <Link to="/" className="text-xs">
              Terms
            </Link>
            <Link to="/" className="text-xs">
              Accessibility
            </Link>
            <Link to="/" className="text-xs">
              Do Not Sell My Info
            </Link>
          </div>
          <div className="flex gap-4">
            <a href="https://facebook.com" aria-label="Facebook">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                FB
              </div>
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                TW
              </div>
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                IG
              </div>
            </a>
            <a href="https://pinterest.com" aria-label="Pinterest">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                PT
              </div>
            </a>
          </div>
        </div>

        <p className="text-xs text-center mt-8">© 2025 Purpleventures, Inc.</p>
      </div>
    </footer>
  );
}
