import { getAllComposers } from '@/app/firebase/queries';
import Searchbar from './Searchbar';

export default async function SearchbarWrapper() {
    console.log("fetching?");
    const composerSnaps = await getAllComposers();
    const composers = composerSnaps.map((composer) => {
                return composer.data();
    })
    return (
        <>
            <Searchbar composersProp={composers} />
        </>
    )
}