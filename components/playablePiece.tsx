"use client"
import { Card, CardBody } from "@nextui-org/card";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { getBlob, getStorage, ref} from "firebase/storage";
import { Howl, Howler} from 'howler';
import { app } from "@/app/firebase/config";
import { useEffect, useState, useRef } from 'react';






export default function PlayablePiece() {
    const storage = getStorage(app);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const gsReference = ref(storage, 'gs://music-analysis-site.appspot.com/Frederic_Chopin_-_Nocturne_Eb_major_Opus_9,_number_2.ogg.mp3');
    const soundRef = useRef<Howl|undefined>();

    
    const [ sound, setSound ] = useState<Howl|undefined>();
    
    useEffect(()=> {
        getBlob(gsReference).then(async (result) => {
            const blob = await result;
            const url = URL.createObjectURL(blob);
            
              setSound(new Howl({
                src: [url],
                format: ['mp3']
            }));
        });
        return (() => {
            console.log("unmount");
            soundRef?.current?.stop();
        })
    }, [])

    useEffect(() => {
        soundRef.current = sound;
      }, [sound]);
  

    function play() {
        sound?.play()
        setIsPlaying(true);
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
                        <div onClick={() => {toggle() }} className="flex transition hover:cursor-pointer hover:bg-slate-100 flex-col justify-center content-center p-5">
                            {!isPlaying ? (<FaPlay />) : (<FaStop />)}
                        </div>
                        <div className="p-3 flex flex-col justify-center transition w-full hover:cursor-pointer hover:bg-slate-100">
                        <p>Nocturne in E-Flat Major | Op. 9 No. 2</p>
               
                        </div>
                        
                    </div>
                   </CardBody>
            </Card>
    )
}