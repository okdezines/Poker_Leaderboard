import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Sponsors</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-gray-300">Sponsor 1</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300">Sponsor 2</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300">Sponsor 3</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Gambling Helpline</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-gray-300">National Gambling Helpline</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300">Gamblers Anonymous</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300">GamCare</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <p>
            PokerLeaderboard is a place to track your poker games and compete
            with your friends.
          </p>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} PokerLeaderboard. All rights reserved.</p>
      </div>
    </footer>
  );
}
