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






export default function Piece({ name, opus, composerid, id }: {composerid: string, opus: string, name: string, id: string }) {
    
    return (
        <Card>
            <CardBody className="p-0">
                <Link href={`/composers/${composerid}/${id}`}> 
                <div className="p-3 flex flex-col justify-center transition w-full dark:hover:bg-cyan-800 hover:cursor-pointer hover:bg-sky-50">
                        <p>{name} <span className="text-gray-400">{opus}</span></p>

                    </div>

                </Link>

                    
            </CardBody>
        </Card>
    )
}