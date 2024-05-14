"use client"
import { getAllComposers } from '@/app/firebase/queries';
import { DocumentData } from 'firebase/firestore';
import Fuse, { FuseResult } from 'fuse.js'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
export default function Searchbar() {
    const router = useRouter();
    const [isFetching, setFetching] = useState(true);
    const [searchResult, setSearchResult] = useState<any>();
    const [composers, setComposers] = useState<any>();
    useEffect(() => {
        async function fetchComposers() {
            setFetching(true);
            const composerSnaps = await getAllComposers();
            const composers = composerSnaps.map((composer) => {
                return composer.data();
            })
            setComposers(composers);
            setFetching(false);

        }
        fetchComposers();
    }, [])
    const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "lastName",
            "name",
        ]
    }
    type Item = {
        id: string;
        name: string;
        lastName: string;
      }
    const handleOnSelect = (item : Item) => {
        console.log(item);
        router.push(`/composers/${item.id}`)
    }

    const formatResult = (item : Item) => {
        return (
            <>
                <span style={{ textAlign: 'left' }}>{item.name}</span>
            </>
        )
    }

    return (

        <>
            <style>
                {
                    `
                    .searchbarDiv .selected {
                        cursor: pointer;
                    }
                    `
                }
            </style>
            {isFetching ? (
                <p>Fetching data for search..</p>
            ) : (
                <div className="searchbarDiv"><ReactSearchAutocomplete 
                items={composers}
                onSelect={handleOnSelect}
                showIcon={false}
                formatResult={formatResult}
                fuseOptions={options} /></div>
            )}
        </>
    );
}