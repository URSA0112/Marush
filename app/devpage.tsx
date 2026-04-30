import React from 'react'
import Link from 'next/link'

export default function Devpage() {
    return (
        <div>
            <div className="flex w-full justify-center p-2 bg-cream gap-2">
                <Link href="/design" className="m-btn">
                    <span className="arr">→</span> Design page
                </Link>

                <Link href="/booking" className="m-btn">
                    <span>Reservation</span>
                    <span className="arr">→</span>
                </Link>
            </div>
        </div>
    )
}
