export default async function copyTextToClipboard(textToCopy: string) {
    try {
        await navigator.clipboard.writeText(textToCopy)
    } catch (error) {
        console.log(`[Clipboard.ts] failure: ${error}`)
    }
}