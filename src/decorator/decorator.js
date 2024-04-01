import React from "react"
import Script from "next/script"
import parse from "html-react-parser"
import { logger } from "@navikt/next-logger"

import { getDecoratorBlocks, getDecoratorMetadata } from "./fetch-decorator"

/**
 * This decorator is used temporarily until the actual decorator is ready for RSC
 */
export async function Decorator({ children, decoratorProps }) {
    const t1 = performance.now()
    const [
        { scripts, styles, inlineScripts, language },
        { header, footer }
    ] = await Promise.all([
        getDecoratorMetadata(decoratorProps),
        getDecoratorBlocks(decoratorProps)
    ])
    logger.info(`Decorator fetched in ${performance.now() - t1}ms`)

    return (
        <html lang={language ?? "nb"}>
        {/* eslint-disable-next-line @next/next/no-head-element */}
            <head>
                {styles.map(it => (
                    <link key={it} rel="stylesheet" href={it} />
                ))}
            </head>
            <body>
                {parse(header)}
                {children}
                {parse(footer)}
                {inlineScripts.map(it => (
                    <div key={it} dangerouslySetInnerHTML={{ __html: it }} />
                ))}
                {scripts.map(it => (
                    <Script key={it} src={it} />
                ))}
            </body>
        </html>
    )
}
