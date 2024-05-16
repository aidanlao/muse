"use client"
import { Card, CardBody } from "@nextui-org/card";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { getBlob, getStorage, ref } from "firebase/storage";
import { Howl, Howler } from 'howler';
import { app } from "@/app/firebase/config";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState, useRef } from 'react';
import clsx from "clsx";
import Link from "next/link";






export default function PlayablePiece({ id, audioid, name, opus, composerid }: {composerid: string, id: string, opus: string, audioid: string, name: string }) {
    const storage = getStorage(app);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFetchingSound, setIsFetchingSound] = useState(false);
    const gsReference = ref(storage, `gs://music-analysis-site.appspot.com/${audioid}`);
    const soundRef = useRef<Howl | undefined>();


    const [sound, setSound] = useState<Howl | undefined>();

    useEffect(() => {

        return (() => {
            console.log("unmount");
            soundRef?.current?.stop();
        })
    }, [])

    useEffect(() => {
        soundRef.current = sound;
    }, [sound]);


    function play() {
        if (!sound) {
            setIsFetchingSound(true);
            console.log("isFetching");
            getBlob(gsReference).then(async (result) => {
                
                const blob = await result;
                const url = URL.createObjectURL(blob);
                const howl = new Howl({
                    src: [url],
                    format: ['mp3']
                })
                console.log("is done");
                setIsFetchingSound(false);
                setIsPlaying(true);
                setSound(howl);
                howl.play()
            });

        } else {
            sound.play();
            setIsPlaying(true);
        }
    }
    function stop() {
        sound?.stop()
        console.log(sound);
        setIsPlaying(false);
    }
    function toggle() {
        if (isPlaying) {
            stop();
        } else {
            play();
        }
    }
    return (
        <Card>
            <CardBody className="p-0">
                <div className="flex  divide-x">
                    <div onClick={() => { toggle() }} className="transition flex transition dark:hover:bg-cyan-800 hover:cursor-pointer hover:bg-sky-50 flex-col justify-center content-center p-5">
                        {!isPlaying ? (
                            isFetchingSound ? (<BsThreeDots /> ): <FaPlay />
                        ) :
                            (<FaStop />)}
                    </div>
                    <Link className="p-3 flex flex-col justify-center transition w-full dark:hover:bg-cyan-800 hover:cursor-pointer hover:bg-sky-50"href={`/composers/${composerid}/${id}`}>
       
                        <p>{name} <span className="text-gray-400">{opus}</span></p>

                    </Link>
       

                </div>
            </CardBody>
        </Card>
    )
}