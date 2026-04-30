import React from 'react'

export default function Navigation() {
    return (
        <nav className="m-nav bg-cream text-ink dark:bg-green-yellow dark:text-cream">
            <div>
                <h1 className="m-wordmark">Marush</h1>
            </div>
            <div
                className="m-nav-links">
                <a href="#home" className="m-nav-link">
                    Home
                </a>
                <a href="#about" className="m-nav-link">
                    About
                </a>
                <a href="#services" className="m-nav-link">
                    Services
                </a>
                <a href="#contact" className="m-nav-link">
                    Contact
                </a>
            </div>
        </nav>
    )
}
