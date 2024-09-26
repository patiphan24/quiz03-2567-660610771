import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "@lib/DB";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms: (<Database>DB).rooms,
    totalRooms: (<Database>DB).rooms.length
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
    if(!payload) {
      return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
      }

  readDB();
  
    const body  = await request.json();
    const { roomName } = body;
    const foundRoom = (<Database>DB).rooms.find(
      (r) => r.roomName === roomName
    )
    if(foundRoom) {
      return NextResponse.json(
        {
          ok: false,
          message: `Room ${"replace this with room name"} already exists`,
        },
      { status: 400 }
    );
      }

  const roomId = nanoid();

  //call writeDB after modifying Database
  (<Database>DB).rooms.push({
  roomId
  ,roomName});

  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${roomName} has been created`,
  });
};
