import { Link } from "wouter";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4 flex gap-4">
            <Link href="/">Dashboard</Link>
            <Link href="/upload">Upload Resume</Link>
            <Link href="/job-description">Job Description</Link>
            <Link href="/tailor">Tailor Resume</Link>
            <Link href="/keywords">Keyword Suggestions</Link>
            <Link href="/matches">Job Matches</Link>
            <Link href="/tracker">Application Tracker</Link>
        </nav>
    );
}