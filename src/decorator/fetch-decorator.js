import { getDecoratorUrl } from "./urls"

export async function getDecoratorMetadata(props) {
    const url = getDecoratorUrl(props, "scripts");

    console.log(`Fetching decorator metadata ${url}`)
    const response = await fetch(url, {
        next: { revalidate: 15 * 60 }
    })

    return response.json();
}

export async function getDecoratorBlocks(props) {
    const headerUrl = getDecoratorUrl(props, "header")
    const footerUrl = getDecoratorUrl(props, "footer")

    console.log("Fetching header and footer")
    const [header, footer] = await Promise.all([
        fetch(headerUrl, {
            next: { revalidate: 15 * 60 }
        }),
        fetch(footerUrl, {
            next: { revalidate: 15 * 60 }
        })
    ])

    return {
        header: await header.text(),
        footer: await footer.text()
    }
}
