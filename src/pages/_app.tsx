import { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
import { AuthProvider } from '@/firebase/auth'
import app from '@/firebase/firebase'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    )
}

export default MyApp