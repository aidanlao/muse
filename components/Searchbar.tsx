"use client"
import { getAllComposers } from '@/app/firebase/queries';
import clsx from 'clsx';
import { DocumentData } from 'firebase/firestore';
import Fuse, { FuseResult } from 'fuse.js'
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
export default function Searchbar({ searchables, placeholder }: { placeholder:string, searchables: any }) {
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
            "composer",
        ]
    }
    const handleOnSelect = (item: Record<string,any>) => {
        console.log(item);
        setIsRedirecting(true);
        if (item.composerid) {
            router.push(`/composers/${item.composerid}/${item.id}`)
        } else {
            router.push(`/composers/${item.id}`)
        }

    }

    const formatResult = (item: Record<string,any>) => {
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
                    .dark .searchbarDiv .wrapper {
                        background-color: rgb(9 9 11);
                        border:1px solid rgb(63 63 70);
                        color: white;
                    }
                    .dark .searchbarDiv .wrapper input {
                        color: white;
                    }
                    .dark .searchbarDiv .selected {
                        background-color:   rgb(39 39 42); 
                    }
                    .searchbarDiv .wrapper {
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
                <div className={clsx("searchbarDiv ", isRedirecting && "opacity-25 pointer-events-none")}>
                    <ReactSearchAutocomplete
                    items={searchables}
                    onSelect={handleOnSelect}
                    placeholder={placeholder}
                    formatResult={formatResult}
                    fuseOptions={options} /></div>

            )}
        </>
    );
}