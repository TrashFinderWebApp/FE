// GET nextjs

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { TrashCanInfo } from "@/types/trashinfo";

const getTrashcanListByLocation = async (
  latitude: number,
  longitude: number,
  radius: number,
) => {
  try {
    const res =
      await sql<TrashCanInfo>`SELECT address,"addressDetail","createdAt",latitude,longitude,"trashcanId",
         earth_distance(
            ll_to_earth(latitude, longitude), 
            ll_to_earth(${latitude}, ${longitude})
    )  as distance 
      FROM trashcan_info 
      WHERE earth_distance(
            ll_to_earth(${latitude}, ${longitude}),
            ll_to_earth(latitude, longitude)
        ) < ${radius}
        ORDER BY distance ASC
          ;`;
    return res.rows;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const latitude = Number(searchParams.get("latitude"));
  const longitude = Number(searchParams.get("longitude"));
  const radius = Number(searchParams.get("radius"));

  return new NextResponse(
    JSON.stringify(
      await getTrashcanListByLocation(latitude, longitude, radius),
    ),
  );
};
