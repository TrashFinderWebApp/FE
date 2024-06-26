import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-60 z-50 bg-white flex-shrink-0">
      <div className="bg-gray-100 p-4 text-center font-bold text-[1.25rem] flex flex-col items-center">
        <img src="/img/tfindercharacter.webp" alt="" className="w-20" />
        쓰파인더
      </div>
      <nav className="flex flex-col">
        <Link href="/admin/map/added" className="hover:bg-gray-100 p-2">
          등록된 쓰레기통
        </Link>
        <Link href="/admin/map/registered" className="hover:bg-gray-100 p-2">
          위치 등록
        </Link>
        <Link href="/admin/map/suggested" className="hover:bg-gray-100 p-2">
          위치 제안
        </Link>
        <Link href="/admin/trashcans" className="hover:bg-gray-100 p-2">
          쓰레기통 리스트
        </Link>
        <Link href="/admin/users" className="hover:bg-gray-100 p-2">
          사용자
        </Link>
        <Link href="/admin/notice" className="hover:bg-gray-100 p-2">
          공지사항
        </Link>
        <Link href="/admin/reports" className="hover:bg-gray-100 p-2">
          신고
        </Link>
      </nav>
    </div>
  );
}
