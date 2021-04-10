import Head from 'next/head'
import Header from '../components/Header'
import Response from '../Response'
import { useRouter } from "next/router"
import SearchResults from '../components/SearchResults';

function search({ results }) {

    const router = useRouter();

    const API_KEY = 'AIzaSyBTMzu9JUWP97LgZLg7zR_9OVwuhaDyZZc';

    // CONTEXT KEY - https://cse.google.com/cse/create/new

    const CONTEXT_KEY = '9bc67f2b2ef848ce2';

    console.log(results);

    return (
        <div>
            <Head>
                <title>{router.query.term} - Google Search</title>
                <link rel="icon" href="https://www.freepngimg.com/thumb/google/67060-play-photos-search-google-account-png-file-hd.png"></link>
            </Head>
            <Header />
            <SearchResults results={results} />
        </div>
    )
}

export default search

export async function getServerSideProps(context) {
    const useDummyData = false;
    const startIndex = context.query.start || '0';

    const data = useDummyData ? Response : await fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBTMzu9JUWP97LgZLg7zR_9OVwuhaDyZZc&cx=9bc67f2b2ef848ce2&q=${context.query.term}&start=${startIndex}`
    ).then((response) => response.json());

    return {
        props: {
            results: data
        }
    }
}

