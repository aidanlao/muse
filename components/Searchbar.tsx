"use client"
import { getAllComposers } from '@/app/firebase/queries';
import clsx from 'clsx';
import { DocumentData } from 'firebase/firestore';
import Fuse, { FuseResult } from 'fuse.js'
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
export default function Searchbar({ composersProp }: { composersProp: any }) {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [isDoneRendering, setIsDoneRendering] = useState(false);

    useEffect(() => {
        setIsDoneRendering(true);
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
    const handleOnSelect = (item: Item) => {
        console.log(item);
        setIsRedirecting(true);
        router.push(`/composers/${item.id}`)

    }

    const formatResult = (item: Item) => {
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
                    `.searchbarDiv .wrapper {
                        font-family: inherit;
                    }
                    .searchbarDiv .selected {
                        cursor: pointer;
                    }
                    .searchbarFetcher {
                          height: 44px;
    border: 1px solid #dfe1e5;
    border-radius: 24px;
    background-color: white;
    boxShadow: rgba(32, 33, 36, 0.28) 0px 1px 6px 0px;
   
    display: flex;
    align-items: center;
    justify-content: center;

    fontSize: 16px;

                    }
                    `
                }
            </style>
            {!isDoneRendering ? (
                <div className={"searchbarFetcher opacity-50"}>
                    <p>
                        Loading searchbar..
                    </p>
                </div>
            ) : (
                <div className={clsx("searchbarDiv", isRedirecting && "opacity-25 pointer-events-none")}><ReactSearchAutocomplete
                    items={composersProp}
                    onSelect={handleOnSelect}
                    placeholder={"Search for a composer"}
                    formatResult={formatResult}
                    fuseOptions={options} /></div>

            )}
        </>
    );
}