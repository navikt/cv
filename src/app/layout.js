import "./globals.css"
import React from "react"
import { Decorator } from "@/decorator/decorator"

export const metadata = {
    title: "Min CV",
    description: ""
};

export default async function RootLayout({ children }) {
    return (
        <Decorator decoratorProps={getDecoratorProps()}>
            <main role="main" id="maincontent" tabIndex={-1}>
                {children}
            </main>
        </Decorator>
    );
}

function getDecoratorProps() {
    return {
        env: "dev",
        params: {
            simple: false,
            redirectToApp: true,
            context: "privatperson",
            breadcrumbs: [
                {
                    title: "Min CV",
                    url: "/personbruker"
                }
            ]
        }
    }
}
