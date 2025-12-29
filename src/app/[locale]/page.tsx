import { getDictionary, hasLocale } from "@/dictionaries";
import { client } from "@/lib/orpc"

export default async function Page({ params }: PageProps<'/[locale]'>) {
    const { locale } = await params
    if (!hasLocale(locale)) return <span>not-found</span>

    const dictionary = await getDictionary(locale)
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1>{dictionary.app}</h1>
            <h2>{await client.hello.world()}</h2>
        </main>
    )
}
