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






export default function PlayablePiece({ filename }: { filename: string }) {
    const storage = getStorage(app);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFetchingSound, setIsFetchingSound] = useState(false);
    const gsReference = ref(storage, `gs://music-analysis-site.appspot.com/${filename}`);
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
                    <div onClick={() => { toggle() }} className="transition flex transition hover:cursor-pointer hover:bg-slate-100 flex-col justify-center content-center p-5">
                        {!isPlaying ? (
                            isFetchingSound ? (<BsThreeDots /> ): <FaPlay />
                        ) :
                            (<FaStop />)}
                    </div>
                    <div className="p-3 flex flex-col justify-center transition w-full dark:hover:bg-slate-800 hover:cursor-pointer hover:bg-slate-100">
                        <p>{filename}</p>

                    </div>

                </div>
            </CardBody>
        </Card>
    )
}