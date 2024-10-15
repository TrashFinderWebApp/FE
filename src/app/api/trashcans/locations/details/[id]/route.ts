// GET nextjs

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { TrashCanInfo } from "@/types/trashinfo";

const getTrashcanDetailById = async (id: string) => {
  try {
    const res =
      await sql<TrashCanInfo>`SELECT address,"addressDetail","createdAt",latitude,longitude,trashcan_info."trashcanId", ARRAY_AGG(trashcan_images."imageUrl") as "imageUrls"
      FROM trashcan_info LEFT JOIN trashcan_images ON trashcan_info."trashcanId" = trashcan_images."trashcanId"
      WHERE trashcan_info."trashcanId" = ${id}
      GROUP BY trashcan_info."trashcanId", address, "addressDetail", "createdAt", latitude, longitude;`;
    console.log(res.rows);
    return res.rows;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;

  return new NextResponse(JSON.stringify(await getTrashcanDetailById(id)));
};
