"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// NextAuth.js のフックや関数
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  // ユーザーがログインしているかどうかを確認するため、現在のセッション情報を取得
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // 認証プロバイダーの情報を取得し、状態に保存
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">ReadTogether</p>
      </Link>

      {/* Desktopナビ */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post" className="black_btn">
              Postを作成
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              サインアウト
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                // 各認証プロバイダーのサインインボタンを表示
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  サインイン
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobileナビ */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  プロフィール
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Postを作成
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  サインアウト
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  サインイン
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
