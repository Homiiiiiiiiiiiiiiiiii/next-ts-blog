import Link from "next/link"
import styles from '@/styles/Home.module.css'
import { useAuth } from "@/firebase/auth";

const Header = () => {
  const{user,loginWithGoogle,logout} = useAuth();
  return (
    <header className={styles.header}>
        <h1>
            <Link href="/">logo</Link>
        </h1>
        <nav>
            <Link href="/about">about</Link>
            <Link href="/post">post</Link>
        </nav>
        <nav className="space-x-4">
          {user ? (
              <>
                <button onClick={logout} className="p-2 bg-red-500 rounded">
                    로그아웃
                </button>
                <Link href="/post/new">글쓰기</Link>
              </>
          ) : (
              <>
                  <button onClick={loginWithGoogle} className="p-2 bg-blue-500 rounded">
                      Google로 로그인
                  </button>
                  <Link href="/login">
                      <button className="p-2 bg-green-500 rounded">로그인</button>
                  </Link>
                  <Link href="/signup">
                      <button className="p-2 bg-yellow-500 rounded">회원가입</button>
                  </Link>
              </>
          )}
        </nav>
    </header>
  )
}

export default Header