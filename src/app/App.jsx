"use client";

import PersonOgCvProvider from "@/app/_common/contexts/PersonOgCvContext";
import AuthenticationProvider from "@/app/_common/contexts/AuthenticationProvider";

function App({ children }) {
    return (
        <AuthenticationProvider>
            <PersonOgCvProvider>
                <div id="app">
                    <main id="main-content">{children}</main>
                </div>
            </PersonOgCvProvider>
        </AuthenticationProvider>
    );
}

export default App;
